'use client';

import { useQueries, useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse } from '@/connections';
import { PRODUCTS_MOCK, isProductInCategories } from '@/contracts/endpoints/products/contract';
import type {
  ProductCard,
  ProductListQuery,
  ProductListResponse,
  ProductSort,
  ProductWireSort,
} from '@/contracts/endpoints/products';
import { queryKeys } from './query-keys';

/* =========================================================
   What `GET /products` can and cannot do
   =========================================================
   The endpoint takes ONE `categorySlug`, sorts by `relevant | newest |
   cheapest`, and rejects an `inStock` param — it 400s on anything else. The
   listing design needs six sorts, a stock toggle and a multi-select category
   facet, so the gap is bridged here: the request is narrowed to what the wire
   accepts, and the rest is applied to the response.

   Delete the client pass, not the UI, when the backend catches up. */

/** UI sort → the closest sort the endpoint accepts. */
const WIRE_SORT: Record<ProductSort, ProductWireSort> = {
  relevant: 'relevant',
  newest: 'newest',
  cheapest: 'cheapest',
  // Reversed client-side, so ask for the same ordering axis.
  expensive: 'cheapest',
  bestselling: 'relevant',
  discounted: 'relevant',
};

/** Sorts with no server-side equivalent — these force the client pass. */
const CLIENT_SORTS: Partial<Record<ProductSort, (a: ProductCard, b: ProductCard) => number>> = {
  expensive: (a, b) => b.price - a.price,
  // No sales figure on the card shape yet — `storeCount` is the closest
  // available proxy for demand.
  bestselling: (a, b) => b.storeCount - a.storeCount,
  discounted: (a, b) => b.discountPercent - a.discountPercent,
};

/**
 * Applies the list query client-side over the full mock catalog. Used only
 * in mock mode — the fetcher resolves a contract's `mockData` as-is,
 * ignoring `query`, so filtering/sorting/pagination has to happen here
 * instead.
 */
const filterMockProducts = (query: ProductListQuery): ProductListResponse => {
  let items = PRODUCTS_MOCK.filter((product) => product.channel === 'RETAIL');

  if (query.categorySlug) {
    items = items.filter((product) => isProductInCategories(product.slug, [query.categorySlug!]));
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

const fetchProducts = async (query: ProductListQuery): Promise<ProductListResponse> => {
  if (isMockMode) {
    return filterMockProducts(query);
  }

  const { inStock: _inStock, sort, ...rest } = query;
  void _inStock;

  const response = await api('products', 'getList', { query: { ...rest, sort: WIRE_SORT[sort] } });

  if (response.status !== 200) {
    throw response;
  }

  return response.data;
};

export const useProducts = (
  query: ProductListQuery,
): UseQueryResult<ProductListResponse, FailedApiResponse> =>
  useQuery<ProductListResponse, FailedApiResponse>({
    queryKey: queryKeys.productsList(query),
    queryFn: () => fetchProducts(query),
  });

/**
 * Page size fetched per category when the result has to be re-sorted, filtered
 * or merged locally. Matches the endpoint's `limit` ceiling.
 */
const CLIENT_PASS_LIMIT = 50;

/**
 * Round-robins the per-category pages so every selected category shows up near
 * the top of an unsorted (`relevant`) view, de-duplicating shared products.
 */
const mergeProductPages = (pages: ProductCard[][]): ProductCard[] => {
  const seen = new Set<number>();
  const merged: ProductCard[] = [];
  const longest = Math.max(0, ...pages.map((page) => page.length));

  for (let index = 0; index < longest; index += 1) {
    for (const page of pages) {
      const product = page[index];

      if (product && !seen.has(product.id)) {
        seen.add(product.id);
        merged.push(product);
      }
    }
  }

  return merged;
};

export interface ProductsByCategoriesResult {
  data?: ProductListResponse;
  isLoading: boolean;
}

/**
 * Product list for the catalog listing, with the multi-select category facet,
 * the six sort options and the stock toggle the design calls for.
 *
 * One selected category with a server-supported sort and no stock filter — the
 * common case — is a single server-paginated request, unchanged. Anything the
 * endpoint cannot express falls back to fetching one capped page per selected
 * category and finishing the job here.
 */
export const useProductsByCategories = (
  query: ProductListQuery,
  categorySlugs: string[],
): ProductsByCategoriesResult => {
  const slugs = categorySlugs.length ? categorySlugs : [query.categorySlug];
  const comparator = CLIENT_SORTS[query.sort];
  const needsClientPass =
    slugs.length > 1 ||
    Boolean(query.inStock) ||
    query.sort === 'discounted' ||
    Boolean(comparator);

  const results = useQueries({
    queries: slugs.map((slug) => {
      const slugQuery: ProductListQuery = needsClientPass
        ? { ...query, categorySlug: slug, page: 1, limit: CLIENT_PASS_LIMIT }
        : { ...query, categorySlug: slug };

      return {
        queryKey: queryKeys.productsList(slugQuery),
        queryFn: () => fetchProducts(slugQuery),
      };
    }),
  });

  const isLoading = results.some((result) => result.isLoading);

  if (!needsClientPass) {
    return { data: results[0]?.data, isLoading };
  }

  let items = mergeProductPages(results.map((result) => result.data?.items ?? []));

  if (query.inStock) {
    items = items.filter((product) => product.stockStatus !== 'OUT_OF_STOCK');
  }

  // «تخفیفات» is a discounts view, not just a discount-first ordering.
  if (query.sort === 'discounted') {
    items = items.filter((product) => product.discountPercent > 0);
  }

  if (comparator) {
    items = [...items].sort(comparator);
  }

  const start = (query.page - 1) * query.limit;

  return {
    data: {
      items: items.slice(start, start + query.limit),
      total: items.length,
      page: query.page,
      limit: query.limit,
    },
    isLoading,
  };
};
