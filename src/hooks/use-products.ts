'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse } from '@/connections';
import { PRODUCTS_MOCK } from '@/contracts/endpoints/products/contract';
import type { ProductListQuery, ProductListResponse } from '@/contracts/endpoints/products';
import { queryKeys } from './query-keys';

/**
 * Applies the list query client-side over the full mock catalog. Used only
 * in mock mode — the fetcher resolves a contract's `mockData` as-is,
 * ignoring `query`, so filtering/sorting/pagination has to happen here
 * instead. Written to match exactly what the real `GET /products` does, so
 * this becomes dead code (never called) once `NEXT_PUBLIC_API_BASE_URL` is
 * set and the real backend does the filtering server-side.
 */
const filterMockProducts = (query: ProductListQuery): ProductListResponse => {
  let items = PRODUCTS_MOCK.filter((product) => product.channel === 'RETAIL');

  if (query.categorySlug) {
    items = items.filter((product) => product.slug.startsWith(`${query.categorySlug}-`));
  }

  if (query.q) {
    const term = query.q.trim().toLowerCase();
    items = items.filter((product) => product.name.toLowerCase().includes(term));
  }

  if (query.minPrice !== undefined) {
    items = items.filter((product) => product.price >= query.minPrice!);
  }

  if (query.maxPrice !== undefined) {
    items = items.filter((product) => product.price <= query.maxPrice!);
  }

  if (query.sort === 'cheapest') {
    items = [...items].sort((a, b) => a.price - b.price);
  } else if (query.sort === 'newest') {
    items = [...items].reverse();
  }

  const total = items.length;
  const start = (query.page - 1) * query.limit;
  const page = items.slice(start, start + query.limit).map((product) => ({
    ...product,
    channel: query.channel,
  }));

  return { items: page, total, page: query.page, limit: query.limit };
};

/** `true` when talking to the mock catalog — read directly so Next.js can inline it client-side. */
const isMockMode = !process.env.NEXT_PUBLIC_API_BASE_URL;

export const useProducts = (
  query: ProductListQuery,
): UseQueryResult<ProductListResponse, FailedApiResponse> =>
  useQuery<ProductListResponse, FailedApiResponse>({
    queryKey: queryKeys.productsList(query),
    queryFn: async () => {
      if (isMockMode) {
        return filterMockProducts(query);
      }

      const response = await api('products', 'getList', { query });

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
