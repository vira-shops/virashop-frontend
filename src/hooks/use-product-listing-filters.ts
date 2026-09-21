'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ProductSort } from '@/contracts/endpoints/products';

export interface ProductListingFilters {
  page: number;
  sort: ProductSort;
  minPrice?: number;
  maxPrice?: number;
  /** «کالای موجود» — drops out-of-stock items when on. */
  inStock: boolean;
}

export interface UseProductListingFiltersResult extends ProductListingFilters {
  setSort: (sort: ProductSort) => void;
  setPage: (page: number) => void;
  setPriceRange: (range: [number, number]) => void;
  setInStock: (value: boolean) => void;
  clearFilters: () => void;
}

/**
 * Reads/writes the product listing's filter state (page/sort/price range) as
 * URL query params — reused by the retail AND wholesale listing sections so
 * filters survive reload/back-navigation, matching the `?channel=`/`?returnTo=`
 * precedent in the auth wizard.
 */
export function useProductListingFilters(): UseProductListingFiltersResult {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const sort = (searchParams.get('sort') as ProductSort | null) ?? 'relevant';
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const minPrice = minPriceParam ? Number(minPriceParam) : undefined;
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;
  const inStock = searchParams.get('inStock') === '1';

  const pushParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined) params.delete(key);
        else params.set(key, value);
      });

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const setSort = useCallback(
    (next: ProductSort) => pushParams({ sort: next, page: undefined }),
    [pushParams],
  );

  const setPage = useCallback((next: number) => pushParams({ page: String(next) }), [pushParams]);

  const setPriceRange = useCallback(
    ([min, max]: [number, number]) =>
      pushParams({ minPrice: String(min), maxPrice: String(max), page: undefined }),
    [pushParams],
  );

  const setInStock = useCallback(
    (value: boolean) => pushParams({ inStock: value ? '1' : undefined, page: undefined }),
    [pushParams],
  );

  const clearFilters = useCallback(
    () =>
      pushParams({
        sort: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        inStock: undefined,
        page: undefined,
      }),
    [pushParams],
  );

  return {
    page,
    sort,
    minPrice,
    maxPrice,
    inStock,
    setSort,
    setPage,
    setPriceRange,
    setInStock,
    clearFilters,
  };
}
