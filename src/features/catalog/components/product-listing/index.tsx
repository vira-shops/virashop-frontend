'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Pagination, Tabs, Typography } from '@/components/ui';
import { CatalogHero, Modal, ProductFilterPanel, ProductGrid } from '@/components/shared';
import { FilterIcon, SortIcon } from '@icons';
import { useCategoryBrowse, useProductListingFilters, useProducts } from '@/hooks';
import { formatToman, toFaDigits } from '@/utils/format';
import { getStorefrontChannelByChannel } from '@/config/storefront';
import { cn } from '@/utils/ui';
import type { ProductCard, ProductSort } from '@/contracts/endpoints/products';
import type { ProductListingProps } from './types';
import {
  CATALOG_PAGE_SIZE,
  CATALOG_PRICE_MIN,
  CATALOG_SEARCH_PLACEHOLDER,
  CATALOG_SORT_OPTIONS,
  CATEGORY_IMAGE_FALLBACK,
  PRODUCT_IMAGE_FALLBACK,
} from './constants';

const STOCK_NOTE: Record<ProductCard['stockStatus'], string | undefined> = {
  IN_STOCK: undefined,
  LOW_STOCK: 'موجودی محدود',
  OUT_OF_STOCK: 'ناموجود',
};

export const ProductListing: React.FC<ProductListingProps> = ({ channel, categorySlug }) => {
  const router = useRouter();
  const config = getStorefrontChannelByChannel(channel);
  const [isFilterOpen, setFilterOpen] = React.useState(false);
  const [isSortOpen, setSortOpen] = React.useState(false);

  const categoryBrowseQuery = useCategoryBrowse(categorySlug);
  const {
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
  } = useProductListingFilters();

  const priceMax = config.priceMax;
  const priceValue: [number, number] = [minPrice ?? CATALOG_PRICE_MIN, maxPrice ?? priceMax];

  const productsQuery = useProducts({
    channel,
    categorySlug,
    page,
    limit: CATALOG_PAGE_SIZE,
    sort,
    minPrice,
    maxPrice,
    inStock: inStock || undefined,
  });

  const category = categoryBrowseQuery.data?.category;
  const ancestors = categoryBrowseQuery.data?.ancestors ?? [];
  const children = categoryBrowseQuery.data?.children ?? [];

  const breadcrumbItems = [
    ...ancestors.map((ancestor) => ({
      label: ancestor.name,
      href: config.paths.CATEGORY(ancestor.slug),
    })),
    ...(category ? [{ label: category.name }] : []),
  ];

  const items = productsQuery.data?.items ?? [];
  const total = productsQuery.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / CATALOG_PAGE_SIZE));

  /**
   * The list endpoint filters by a single `categorySlug`, so the category
   * checkboxes navigate instead of accumulating — the checked box is simply
   * the category currently being viewed.
   */
  const goToCategory = (slug: string) => router.push(config.paths.CATEGORY(slug));

  const categoryGroups = category
    ? [
        {
          id: category.slug,
          label: category.name,
          allLabel: `همه ${category.name}`,
          options: children.map((child) => ({
            id: child.id,
            slug: child.slug,
            label: child.name,
            productCount: child.productCount,
          })),
        },
      ]
    : [];

  const filterPanel = (
    <ProductFilterPanel
      priceMin={CATALOG_PRICE_MIN}
      priceMax={priceMax}
      priceValue={priceValue}
      formatPrice={formatToman}
      onPriceCommit={setPriceRange}
      categoryGroups={categoryGroups}
      selectedCategorySlugs={[categorySlug]}
      onCategoryToggle={goToCategory}
      onCategoryGroupToggle={() => category && goToCategory(category.slug)}
      inStock={inStock}
      onInStockChange={setInStock}
      onClear={clearFilters}
    />
  );

  const handleSortChange = (value: string) => setSort(value as ProductSort);

  return (
    <>
      <CatalogHero
        breadcrumbItems={breadcrumbItems}
        searchPlaceholder={CATALOG_SEARCH_PLACEHOLDER}
        hrefForCategory={(slug) => config.paths.CATEGORY(slug)}
        hrefForSearch={(query) => `${config.paths.SEARCH}?q=${encodeURIComponent(query)}`}
        categories={children.map((child) => ({
          id: child.id,
          title: child.name,
          image: CATEGORY_IMAGE_FALLBACK,
          href: config.paths.CATEGORY(child.slug),
        }))}
        activeCategoryId={category?.id}
      />

      <div className="container flex flex-col gap-6 py-6 md:py-8">
        {/* Mobile: sort + filter triggers. Desktop: the sort tab row. */}
        <div className="flex items-center gap-3 md:hidden">
          <Button
            size="md"
            variant="outline"
            color="primary"
            fullWidth
            onClick={() => setFilterOpen(true)}
            rightIcon={<FilterIcon className="size-6" />}
            className="border-gray-100 bg-white text-gray-700"
          >
            فیلتر
          </Button>
          <Button
            size="md"
            variant="outline"
            color="primary"
            fullWidth
            onClick={() => setSortOpen(true)}
            rightIcon={<SortIcon className="size-6" />}
            className="border-gray-100 bg-white text-gray-700"
          >
            مرتب سازی
          </Button>
        </div>

        <div className="hidden items-center justify-between border-b border-gray-100 md:flex">
          <Tabs
            variant="underline"
            color="primary"
            size="md"
            items={CATALOG_SORT_OPTIONS.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            value={sort}
            onChange={handleSortChange}
            aria-label="مرتب سازی"
          />

          <Typography variant="body-sm" className="text-gray-300">
            {toFaDigits(total)} محصول
          </Typography>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="hidden w-64 shrink-0 lg:block">{filterPanel}</aside>

          <div className="flex flex-1 flex-col gap-6">
            <ProductGrid
              isLoading={productsQuery.isLoading}
              items={items.map((product) => ({
                id: product.id,
                image: {
                  src: product.imageUrl ?? PRODUCT_IMAGE_FALLBACK,
                  alt: product.name,
                },
                startBadge: product.badges[0],
                endBadge:
                  product.discountPercent > 0
                    ? `${toFaDigits(product.discountPercent)}٪ تخفیف`
                    : undefined,
                title: product.name,
                priceLabel: 'قیمت از',
                price: `${formatToman(product.price)} تومان`,
                stockNote:
                  STOCK_NOTE[product.stockStatus] ?? `در ${toFaDigits(product.storeCount)} فروشگاه`,
                action: { label: 'خرید', href: config.paths.PRODUCT(product.slug) },
              }))}
            />

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      </div>

      {/* Mobile sheets */}
      <Modal
        open={isFilterOpen}
        onClose={() => setFilterOpen(false)}
        title="فیلتر"
        size="sm"
        headerClassName="flex-row-reverse justify-end gap-3"
      >
        {filterPanel}
      </Modal>

      <Modal
        open={isSortOpen}
        onClose={() => setSortOpen(false)}
        title="مرتب سازی"
        size="sm"
        headerClassName="flex-row-reverse justify-end gap-3"
      >
        <fieldset className="flex flex-col">
          <legend className="sr-only">مرتب سازی</legend>
          {CATALOG_SORT_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center justify-between gap-3 py-4"
            >
              <Typography
                variant="body-sm"
                className={cn(sort === option.value ? 'text-primary' : 'text-gray-700')}
              >
                {option.label}
              </Typography>
              <input
                type="radio"
                name="catalog-sort"
                value={option.value}
                checked={sort === option.value}
                onChange={() => {
                  handleSortChange(option.value);
                  setSortOpen(false);
                }}
                className="accent-primary size-5"
              />
            </label>
          ))}
        </fieldset>
      </Modal>
    </>
  );
};

ProductListing.displayName = 'ProductListing';
