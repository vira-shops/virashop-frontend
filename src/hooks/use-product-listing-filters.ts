'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import type { ProductSort } from '@/contracts/endpoints/products';

export interface ProductListingFilters {
  page: number;
  sort: ProductSort;
  minPrice?: number;
  maxPrice?: number;
  /** «کالای موجود» — drops out-of-stock items when on. */
  inStock: boolean;
  /** Multi-select subcategory filter (`?categories=a,b`). Empty = the whole category. */
  categories: string[];
}

export interface UseProductListingFiltersResult extends ProductListingFilters {
  setSort: (sort: ProductSort) => void;
  setPage: (page: number) => void;
  setPriceRange: (range: [number, number]) => void;
  setInStock: (value: boolean) => void;
  /** Adds/removes one slug from the category selection. */
  toggleCategory: (slug: string) => void;
  setCategories: (slugs: string[]) => void;
  clearFilters: () => void;
}

/**
 * Reads/writes the product listing's filter state (page/sort/price/categories)
 * as URL query params — reused by the retail AND wholesale listing sections so
 * filters survive reload/back-navigation, matching the `?channel=`/`?returnTo=`
 * precedent in the auth wizard.
 *
 * Updates go through `window.history.pushState` rather than `router.push`.
 * Next.js keeps `useSearchParams` in sync with the native history methods, so
 * a filter change re-renders only the client components that read this hook —
 * no server round-trip, no scroll reset, no remounted hero. Route changes
 * (picking a different category in the hero) stay real navigations via `Link`.
 */
export function useProductListingFilters(): UseProductListingFiltersResult {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const sort = (searchParams.get('sort') as ProductSort | null) ?? 'relevant';
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const minPrice = minPriceParam ? Number(minPriceParam) : undefined;
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;
  const inStock = searchParams.get('inStock') === '1';
  const categoriesParam = searchParams.get('categories');
  // Memoised so `toggleCategory` keeps a stable identity between renders.
  const categories = useMemo(
    () => (categoriesParam ? categoriesParam.split(',').filter(Boolean) : []),
    [categoriesParam],
  );

  const pushParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined) params.delete(key);
        else params.set(key, value);
      });

      const search = params.toString();

      window.history.pushState(null, '', search ? `${pathname}?${search}` : pathname);
    },
    [pathname, searchParams],
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

  const setCategories = useCallback(
    (slugs: string[]) =>
      pushParams({ categories: slugs.length ? slugs.join(',') : undefined, page: undefined }),
    [pushParams],
  );

  const toggleCategory = useCallback(
    (slug: string) =>
      setCategories(
        categories.includes(slug)
          ? categories.filter((item) => item !== slug)
          : [...categories, slug],
      ),
    [categories, setCategories],
  );

  const clearFilters = useCallback(
    () =>
      pushParams({
        sort: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        inStock: undefined,
        categories: undefined,
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
    categories,
    setSort,
    setPage,
    setPriceRange,
    setInStock,
    toggleCategory,
    setCategories,
    clearFilters,
  };
}
