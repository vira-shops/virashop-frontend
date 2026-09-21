'use client';

import * as React from 'react';
import { Pagination, Select, Typography } from '@/components/ui';
import { ProductGrid } from '@/components/shared/product-grid';
import { useProductListingFilters, useSearch } from '@/hooks';
import { formatToman, toFaDigits } from '@/utils/format';
import { cn } from '@/utils/ui';
import type { ProductCard, ProductSort } from '@/contracts/endpoints/products';
import type { SearchResultsSectionProps } from './types';

const PAGE_SIZE = 20;

const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: 'relevant', label: 'مرتبط‌ترین' },
  { value: 'cheapest', label: 'ارزان‌ترین' },
  { value: 'newest', label: 'جدیدترین' },
];

const STOCK_NOTE: Record<ProductCard['stockStatus'], string | undefined> = {
  IN_STOCK: undefined,
  LOW_STOCK: 'موجودی محدود',
  OUT_OF_STOCK: 'ناموجود',
};

/** Search results page — `/search?q=` results, reusing the listing filter/sort URL state. */
export const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({
  channel,
  query,
  hrefForProduct,
  hrefForCategory,
  className,
}) => {
  const { page, sort, setSort, setPage } = useProductListingFilters();

  const searchQuery = useSearch({ q: query, channel, page, limit: PAGE_SIZE, sort });

  const items = searchQuery.data?.products.items ?? [];
  const total = searchQuery.data?.products.total ?? 0;
  const categories = searchQuery.data?.categories ?? [];
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className={cn('container flex flex-col gap-6 py-8', className)}>
      <Typography variant="h5" className="text-black">
        نتایج جستجو برای «{query}»
      </Typography>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={hrefForCategory(category.slug)}
              className="rounded-full bg-gray-100 px-4 py-2"
            >
              <Typography variant="body-sm" className="text-gray-700">
                {category.name}
              </Typography>
            </a>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <Typography variant="body-sm" className="text-gray-300">
          {toFaDigits(total)} محصول
        </Typography>

        <Select
          size="sm"
          value={sort}
          onValueChange={(value) => setSort(value as ProductSort)}
          className="w-40"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <ProductGrid
        isLoading={searchQuery.isLoading}
        emptyLabel="محصولی برای این جستجو یافت نشد"
        items={items.map((product) => ({
          id: product.id,
          image: { src: product.imageUrl ?? '/images/landing/big-offer/01.png', alt: product.name },
          endBadge:
            product.discountPercent > 0 ? `${toFaDigits(product.discountPercent)}٪` : undefined,
          title: product.name,
          price: `${formatToman(product.price)} تومان`,
          stockNote: STOCK_NOTE[product.stockStatus],
          action: { label: 'مشاهده', href: hrefForProduct(product.slug) },
        }))}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

SearchResultsSection.displayName = 'SearchResultsSection';
