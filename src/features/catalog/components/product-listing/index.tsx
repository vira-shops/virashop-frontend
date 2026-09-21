'use client';

import * as React from 'react';
import { CatalogHero, FilterIcon, Modal } from '@/components/shared';
import {
  ListingFilters,
  ListingProducts,
  ListingSortSheet,
  ListingSortTabs,
  ListingToolbar,
} from '@/features/catalog/components/product-listing/parts';
import { useProductListing } from '@/features/catalog/components/product-listing/use-product-listing';
import { CATALOG_SEARCH_PLACEHOLDER } from '@/features/catalog/components/product-listing/constants';
import type { ProductListingProps } from './types';

export const ProductListing: React.FC<ProductListingProps> = ({ channel, categorySlug }) => {
  const [isFilterOpen, setFilterOpen] = React.useState(false);
  const [isSortOpen, setSortOpen] = React.useState(false);

  const {
    filters,
    breadcrumbItems,
    heroCategories,
    activeCategoryId,
    categoryGroups,
    cards,
    total,
    totalPages,
    isLoading,
    priceMax,
    theme,
    hrefForCategory,
    hrefForSearch,
  } = useProductListing(channel, categorySlug);

  const filterPanel = (
    <ListingFilters filters={filters} priceMax={priceMax} categoryGroups={categoryGroups} />
  );

  return (
    <>
      <CatalogHero
        breadcrumbItems={breadcrumbItems}
        searchPlaceholder={CATALOG_SEARCH_PLACEHOLDER}
        hrefForCategory={hrefForCategory}
        hrefForSearch={hrefForSearch}
        categories={heroCategories}
        activeCategoryId={activeCategoryId}
      />

      <div className="container flex flex-col gap-6 py-6 md:py-8">
        <ListingToolbar
          onFilterClick={() => setFilterOpen(true)}
          onSortClick={() => setSortOpen(true)}
        />

        <ListingSortTabs sort={filters.sort} total={total} onSortChange={filters.setSort} />

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="hidden w-64 shrink-0 lg:block">{filterPanel}</aside>

          <ListingProducts
            items={cards}
            isLoading={isLoading}
            page={filters.page}
            totalPages={totalPages}
            onPageChange={filters.setPage}
          />
        </div>
      </div>

      <Modal
        open={isFilterOpen}
        onClose={() => setFilterOpen(false)}
        title="فیلتر"
        icon={<FilterIcon className="size-8" />}
        size="sm"
        theme={theme}
        headerClassName="flex-row-reverse justify-end gap-3"
      >
        {filterPanel}
      </Modal>

      <ListingSortSheet
        open={isSortOpen}
        sort={filters.sort}
        theme={theme}
        onSelect={filters.setSort}
        onClose={() => setSortOpen(false)}
      />
    </>
  );
};

ProductListing.displayName = 'ProductListing';
