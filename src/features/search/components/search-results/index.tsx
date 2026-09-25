'use client';

import * as React from 'react';
import Link from 'next/link';
import { Pagination, Select, Typography } from '@/components/ui';
import { ProductGrid } from '@/components/shared';
import { useProductListingFilters, useSearch } from '@/hooks';
import { formatToman, toFaDigits } from '@/utils/format';
import { getStorefrontChannelByChannel } from '@/config/storefront';
import type { ProductSort } from '@/contracts/endpoints/products';
import {
  SEARCH_IMAGE_FALLBACK,
  SEARCH_PAGE_SIZE,
  SEARCH_RESULTS_COPY as COPY,
  SEARCH_SORT_OPTIONS,
  STOCK_NOTE,
} from './constants';
import type { SearchResultsProps } from './types';

/** Search results page — `/search?q=` results, reusing the listing filter/sort URL state. */
export const SearchResults: React.FC<SearchResultsProps> = ({ channel, query }) => {
  const config = getStorefrontChannelByChannel(channel);
  const { page, sort, setSort, setPage } = useProductListingFilters();

  const searchQuery = useSearch({
    q: query,
    channel,
    page,
    limit: SEARCH_PAGE_SIZE,
    sort,
  });

  const items = searchQuery.data?.products.items ?? [];
  const total = searchQuery.data?.products.total ?? 0;
  const categories = searchQuery.data?.categories ?? [];
  const totalPages = Math.max(1, Math.ceil(total / SEARCH_PAGE_SIZE));

  return (
    <div className="container flex flex-col gap-6 py-8">
      <Typography variant="h5" className="text-black">
        {COPY.title(query)}
      </Typography>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={config.paths.CATEGORY_PRODUCTS(category.slug)}
              className="rounded-full bg-gray-100 px-4 py-2"
            >
              <Typography variant="body-sm" className="text-gray-700">
                {category.name}
              </Typography>
            </Link>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <Typography variant="body-sm" className="text-gray-300">
          {COPY.resultCount(toFaDigits(total))}
        </Typography>

        <Select
          size="sm"
          value={sort}
          onValueChange={(value) => setSort(value as ProductSort)}
          className="w-40"
        >
          {SEARCH_SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <ProductGrid
        isLoading={searchQuery.isLoading}
        emptyLabel={COPY.empty}
        items={items.map((product) => ({
          id: product.id,
          image: { src: product.imageUrl ?? SEARCH_IMAGE_FALLBACK, alt: product.name },
          endBadge:
            product.discountPercent > 0
              ? COPY.discount(toFaDigits(product.discountPercent))
              : undefined,
          title: product.name,
          price: formatToman(product.price),
          stockNote: STOCK_NOTE[product.stockStatus],
          action: { label: COPY.view, href: config.paths.PRODUCT(product.slug) },
        }))}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

SearchResults.displayName = 'SearchResults';
