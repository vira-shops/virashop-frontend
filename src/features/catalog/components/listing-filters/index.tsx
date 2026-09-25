'use client';

import * as React from 'react';
import { ProductFilterPanel } from '@/components/shared';
import { formatToman } from '@/utils/format';
import { CATALOG_PRICE_MIN } from './constants';
import type { ListingFiltersProps } from './types';

export type { ListingFiltersProps } from './types';

export const ListingFilters: React.FC<ListingFiltersProps> = ({
  filters,
  priceMax,
  categoryGroups,
}) => (
  <ProductFilterPanel
    priceMin={CATALOG_PRICE_MIN}
    priceMax={priceMax}
    priceValue={[filters.minPrice ?? CATALOG_PRICE_MIN, filters.maxPrice ?? priceMax]}
    formatPrice={formatToman}
    onPriceCommit={filters.setPriceRange}
    categoryGroups={categoryGroups}
    selectedCategorySlugs={filters.categories}
    onCategoryToggle={filters.toggleCategory}
    onCategoryGroupToggle={(slugs, selectAll) => filters.setCategories(selectAll ? slugs : [])}
    inStock={filters.inStock}
    onInStockChange={filters.setInStock}
    onClear={filters.clearFilters}
  />
);

ListingFilters.displayName = 'ListingFilters';
