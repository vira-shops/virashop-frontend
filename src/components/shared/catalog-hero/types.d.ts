import type { BreadcrumbItem } from '@/components/shared/breadcrumb/types';
import type { CategoryIconNavItem } from '@/components/shared/category-icon-nav/types';

export interface CatalogHeroProps {
  /** Category trail shown above the search bar. */
  breadcrumbItems?: BreadcrumbItem[];
  searchPlaceholder?: string;
  /** Category-page search routes — same wiring as the storefront hero. */
  hrefForCategory?: (slug: string) => string;
  hrefForSearch?: (query: string) => string;
  /** Sibling-category tiles under the search bar. */
  categories?: CategoryIconNavItem[];
  activeCategoryId?: string | number;
  className?: string;
}
