'use client';

import { toFaDigits } from '@/utils/format';
import { getStorefrontChannelByChannel } from '@/config/storefront';
import { useCategoryBrowse } from './use-category-browse';
import { usePopularCategories } from './use-popular-categories';
import type { CategoryIconNavItem } from '@/components/shared/category-icon-nav/types';
import type { Channel } from '@/validations/primitives';

/** Placeholder tile art until the real category imagery lands. */
export const CATEGORY_IMAGE_FALLBACK = '/images/landing/big-offer/01.png';

/** Category landing heading — the category's own name follows it. */
const HEADING_LEAD = 'دستـــــــه بندی';
/** Storefront landing heading — no category to name. */
const HEADING_ALL = 'دستـــــــه بندی ها';

/** «بیش از N محصول» — dropped when the API reports no count for the node. */
const productCountLabel = (count: number): string | undefined =>
  count > 0 ? `بیش از ${toFaDigits(count)} محصول` : undefined;

export interface StorefrontHeroCategories {
  /** Neutral lead of the heading. */
  title: string;
  /** Category name, rendered in the primary colour. Absent on the landing. */
  highlight?: string;
  /** Omitted when the product count is unknown, so no «بیش از ۰ محصول». */
  subtitle?: string;
  items: CategoryIconNavItem[];
  activeId?: number;
  isLoading: boolean;
}

/**
 * Hero heading + tiles for a storefront page.
 *
 * Without `categorySlug` this is the storefront landing: the popular
 * categories under «دستـــــــه بندی ها». With one it is that category's
 * landing: its own name in the heading and its children as the tiles — the
 * same block, different data, which is exactly how the two pages relate.
 */
export const useStorefrontHeroCategories = (
  channel: Channel,
  categorySlug?: string,
): StorefrontHeroCategories => {
  const config = getStorefrontChannelByChannel(channel);

  const popularQuery = usePopularCategories(channel);
  const browseQuery = useCategoryBrowse(categorySlug ?? '');

  if (!categorySlug) {
    const popular = popularQuery.data ?? [];

    return {
      title: HEADING_ALL,
      subtitle: productCountLabel(
        popular.reduce((total, category) => total + category.productCount, 0),
      ),
      items: popular.map((category) => ({
        id: category.id,
        title: category.title,
        image: category.image,
        imageAlt: category.imageAlt,
        href: category.href,
      })),
      isLoading: popularQuery.isLoading,
    };
  }

  const category = browseQuery.data?.category;
  const children = browseQuery.data?.children ?? [];

  return {
    title: HEADING_LEAD,
    highlight: category?.name,
    subtitle: productCountLabel(category?.productCount ?? 0),
    /*
      The storefront landing is the only way into a category landing; from
      there every tile drops straight into the catalog, so browsing always
      ends at products instead of hopping between category landings.
    */
    items: children.map((child) => ({
      id: child.id,
      title: child.name,
      image: CATEGORY_IMAGE_FALLBACK,
      href: config.paths.CATEGORY_PRODUCTS(child.slug),
    })),
    activeId: category?.id,
    isLoading: browseQuery.isLoading,
  };
};
