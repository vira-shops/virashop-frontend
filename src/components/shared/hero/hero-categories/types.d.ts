import type { ReactNode } from 'react';
import type { CategoryIconNavItem } from '@/components/shared/category-icon-nav/types';

export interface HeroCategoriesProps {
  /** Heading lead, in the neutral colour — e.g. «دستـــــــه بندی». */
  title: ReactNode;
  /**
   * Tail of the heading, in the storefront's primary colour. The category
   * landing puts the category name here («… مواد غذایی»); the storefront
   * landing leaves it out.
   */
  highlight?: ReactNode;
  subtitle?: ReactNode;
  items: CategoryIconNavItem[];
  /** Tile marked as the one currently being browsed. */
  activeId?: string | number;
  isLoading?: boolean;
  /** Tiles rendered by the skeleton while `isLoading`. @default 8 */
  skeletonCount?: number;
  className?: string;
  titleClassName?: string;
}
