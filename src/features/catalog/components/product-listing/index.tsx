'use client';

import * as React from 'react';
import { FilterIcon } from '@icons';
import { CatalogHero, Modal } from '@/components/shared';
import { FILTER_LABEL, SHEET_HEADER_CLASS } from '@/features/catalog/constants';
import { ListingFilters } from '@/features/catalog/components/listing-filters';
import { ListingProducts } from '@/features/catalog/components/listing-products';
import { ListingSortSheet } from '@/features/catalog/components/listing-sort-sheet';
import { ListingSortTabs } from '@/features/catalog/components/listing-sort-tabs';
import { ListingToolbar } from '@/features/catalog/components/listing-toolbar';
import { useProductListing } from './use-product-listing';
import { CATALOG_SEARCH_PLACEHOLDER } from './constants';
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

      <div className="container -mt-14 flex flex-col gap-6 py-6 md:py-8">
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
        title={FILTER_LABEL}
        icon={<FilterIcon className="size-8" />}
        size="sm"
        theme={theme}
        headerClassName={SHEET_HEADER_CLASS}
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
