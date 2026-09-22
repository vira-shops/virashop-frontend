'use client';

import { useCategoryBrowse, useProductListingFilters, useProductsByCategories } from '@/hooks';
import { getStorefrontChannelByChannel } from '@/config/storefront';
import { formatToman, toFaDigits } from '@/utils/format';
import {
  CATALOG_PAGE_SIZE,
  CATEGORY_IMAGE_FALLBACK,
  PRODUCT_IMAGE_FALLBACK,
} from '@/features/catalog/components/product-listing/constants';
import type { BreadcrumbItem } from '@/components/shared/breadcrumb/types';
import type { CategoryIconNavItem } from '@/components/shared/category-icon-nav/types';
import type { ProductFilterGroup } from '@/components/shared/product-filter-panel/types';
import type { ProductGridItem } from '@/components/shared/product-grid/types';
import type { ProductCard } from '@/contracts/endpoints/products';
import type { Channel } from '@/validations/primitives';
import type { UseProductListingFiltersResult } from '@/hooks';

const STOCK_NOTE: Record<ProductCard['stockStatus'], string | undefined> = {
  IN_STOCK: undefined,
  LOW_STOCK: 'موجودی محدود',
  OUT_OF_STOCK: 'ناموجود',
};

export interface ProductListingViewModel {
  filters: UseProductListingFiltersResult;
  breadcrumbItems: BreadcrumbItem[];
  heroCategories: CategoryIconNavItem[];
  activeCategoryId?: number;
  categoryGroups: ProductFilterGroup[];
  cards: ProductGridItem[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  priceMax: number;
  /** Storefront `data-theme` value, for the portalled mobile sheets. */
  theme: string;
  hrefForCategory: (slug: string) => string;
  hrefForSearch: (query: string) => string;
}

/**
 * Turns the browsed category + filter state into everything the listing
 * renders. Kept beside the section (single consumer) — move it to `@/hooks`
 * if a second surface ever needs it.
 */
export const useProductListing = (
  channel: Channel,
  categorySlug: string,
): ProductListingViewModel => {
  const config = getStorefrontChannelByChannel(channel);
  const filters = useProductListingFilters();

  const categoryBrowseQuery = useCategoryBrowse(categorySlug);
  const category = categoryBrowseQuery.data?.category;
  const ancestors = categoryBrowseQuery.data?.ancestors ?? [];
  const children = categoryBrowseQuery.data?.children ?? [];

  /*
    A leaf category has no children to show in the hero, so it shows its
    siblings instead — the row stays put as you drill in and the tile you are
    on is the one highlighted. An empty slug leaves the query disabled.
  */
  const parentSlug = ancestors.at(-1)?.slug ?? '';
  const siblingsQuery = useCategoryBrowse(children.length === 0 ? parentSlug : '');
  const heroNodes = children.length > 0 ? children : (siblingsQuery.data?.children ?? []);

  const { categories } = filters;

  // A subcategory selection always sits inside the browsed category, so the
  // selected slugs replace it rather than intersecting with it.
  const productsQuery = useProductsByCategories(
    {
      channel,
      page: filters.page,
      limit: CATALOG_PAGE_SIZE,
      sort: filters.sort,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      inStock: filters.inStock || undefined,
      categorySlug,
    },
    categories,
  );

  const selectedNames = children
    .filter((child) => categories.includes(child.slug))
    .map((child) => child.name);

  /** Selected subcategories become the last crumb, so the trail tracks the filter. */
  const selectionLabel =
    selectedNames.length === 0
      ? undefined
      : selectedNames.length <= 2
        ? selectedNames.join('، ')
        : `${selectedNames[0]} و ${toFaDigits(selectedNames.length - 1)} مورد دیگر`;

  const breadcrumbItems: BreadcrumbItem[] = [
    ...ancestors.map((ancestor) => ({
      label: ancestor.name,
      href: config.paths.CATEGORY(ancestor.slug),
    })),
    ...(category
      ? [
          {
            label: category.name,
            // Linkable once a filter is on, so the crumb walks back to the
            // unfiltered category.
            href: selectionLabel ? config.paths.CATEGORY(category.slug) : undefined,
          },
        ]
      : []),
    ...(selectionLabel ? [{ label: selectionLabel }] : []),
  ];

  const total = productsQuery.data?.total ?? 0;

  return {
    filters,
    breadcrumbItems,
    heroCategories: heroNodes.map((node) => ({
      id: node.id,
      title: node.name,
      image: CATEGORY_IMAGE_FALLBACK,
      href: config.paths.CATEGORY(node.slug),
    })),
    activeCategoryId: category?.id,
    categoryGroups:
      category && children.length
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
        : [],
    cards: (productsQuery.data?.items ?? []).map((product) => ({
      id: product.id,
      image: { src: product.imageUrl ?? PRODUCT_IMAGE_FALLBACK, alt: product.name },
      startBadge: product.badges[0],
      endBadge:
        product.discountPercent > 0 ? `${toFaDigits(product.discountPercent)}٪ تخفیف` : undefined,
      title: product.name,
      priceLabel: 'قیمت از',
      price: formatToman(product.price),
      stockNote: STOCK_NOTE[product.stockStatus] ?? `در ${toFaDigits(product.storeCount)} فروشگاه`,
      action: { label: 'خرید', href: config.paths.PRODUCT(product.slug) },
    })),
    total,
    totalPages: Math.max(1, Math.ceil(total / CATALOG_PAGE_SIZE)),
    isLoading: productsQuery.isLoading,
    priceMax: config.priceMax,
    theme: config.segment,
    hrefForCategory: (slug) => config.paths.CATEGORY(slug),
    hrefForSearch: (query) => `${config.paths.SEARCH}?q=${encodeURIComponent(query)}`,
  };
};
