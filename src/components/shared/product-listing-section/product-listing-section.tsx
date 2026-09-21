'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Pagination, Select, Typography } from '@/components/ui';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import { CategoryIconNav } from '@/components/shared/category-icon-nav';
import { Modal } from '@/components/shared/modal';
import { ProductFilterPanel } from '@/components/shared/product-filter-panel';
import { ProductGrid } from '@/components/shared/product-grid';
import { useCategoryBrowse, useProductListingFilters, useProducts } from '@/hooks';
import { formatToman, toFaDigits } from '@/utils/format';
import { cn } from '@/utils/ui';
import type { ProductCard, ProductSort } from '@/contracts/endpoints/products';
import type { ProductListingSectionProps } from './types';

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

const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);

/**
 * Product listing — wires `/categories/:slug` (breadcrumb + child-category
 * row) and `/products` (grid + filter/sort/pagination) into the shared
 * primitives. Identical behavior for retail/wholesale; the feature wrapper
 * only supplies `channel` + href builders, matching the `BestSellersSection`
 * pattern of one shared wired component scoped by its caller.
 */
export const ProductListingSection: React.FC<ProductListingSectionProps> = ({
  channel,
  categorySlug,
  hrefForProduct,
  hrefForCategory,
  priceMin = 0,
  priceMax = 5_000_000,
  className,
}) => {
  const router = useRouter();
  const [isFilterOpen, setFilterOpen] = React.useState(false);
  const categoryBrowseQuery = useCategoryBrowse(categorySlug);
  const { page, sort, minPrice, maxPrice, setSort, setPage, setPriceRange, clearFilters } =
    useProductListingFilters();

  const priceValue: [number, number] = [minPrice ?? priceMin, maxPrice ?? priceMax];

  const productsQuery = useProducts({
    channel,
    categorySlug,
    page,
    limit: PAGE_SIZE,
    sort,
    minPrice,
    maxPrice,
  });

  const category = categoryBrowseQuery.data?.category;
  const ancestors = categoryBrowseQuery.data?.ancestors ?? [];
  const children = categoryBrowseQuery.data?.children ?? [];

  const breadcrumbItems = [
    ...ancestors.map((ancestor) => ({
      label: ancestor.name,
      href: hrefForCategory(ancestor.slug),
    })),
    ...(category ? [{ label: category.name }] : []),
  ];

  const items = productsQuery.data?.items ?? [];
  const total = productsQuery.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const filterPanel = (
    <ProductFilterPanel
      priceMin={priceMin}
      priceMax={priceMax}
      priceValue={priceValue}
      formatPrice={formatToman}
      onPriceChange={setPriceRange}
      categories={children.map((child) => ({
        id: child.id,
        slug: child.slug,
        label: child.name,
        productCount: child.productCount,
      }))}
      activeCategorySlug={categorySlug}
      onCategorySelect={(slug) => router.push(hrefForCategory(slug))}
      onClear={clearFilters}
    />
  );

  return (
    <div className={cn('container flex flex-col gap-8 py-8', className)}>
      {breadcrumbItems.length > 0 && <Breadcrumb items={breadcrumbItems} />}

      {children.length > 0 && (
        <CategoryIconNav
          items={children.map((child) => ({
            id: child.id,
            title: child.name,
            // `imageKey` is a raw asset slug/storage key, not a URL — categories have
            // no resolved `imageUrl` yet, so fall back to a static placeholder.
            image: '/images/landing/big-offer/01.png',
            href: hrefForCategory(child.slug),
          }))}
        />
      )}

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="hidden w-64 shrink-0 lg:block">{filterPanel}</aside>

        <div className="flex flex-1 flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <Button
              size="sm"
              variant="outline"
              color="primary"
              className="lg:hidden"
              onClick={() => setFilterOpen(true)}
              rightIcon={<FilterIcon className="h-4 w-4" />}
            >
              فیلترها
            </Button>

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
            isLoading={productsQuery.isLoading}
            items={items.map((product) => ({
              id: product.id,
              image: {
                src: product.imageUrl ?? '/images/landing/big-offer/01.png',
                alt: product.name,
              },
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
      </div>

      <Modal open={isFilterOpen} onClose={() => setFilterOpen(false)} title="فیلترها" size="sm">
        {filterPanel}
      </Modal>
    </div>
  );
};

ProductListingSection.displayName = 'ProductListingSection';
