import { PATHS } from '@/routes/paths';

/** Mobile nav items for the retail sidebar — includes Favorites with heart icon. */
export const MOBILE_NAV_ITEMS: ReadonlyArray<{
  label: string;
  href: string;
  icon?: string;
}> = [
  { label: 'مورد علاقه‌ها', href: PATHS.RETAIL.FAVORITES, icon: 'HeartIcon' },
  { label: 'بلاگ', href: PATHS.BLOG },
  { label: 'تخفیف‌ها', href: PATHS.RETAIL.OFFERS },
  { label: 'درباره ما', href: PATHS.ABOUT },
  { label: 'پرفروش‌ترین‌ها', href: PATHS.RETAIL.BEST_SELLERS },
];

/** Secondary nav items in the desktop header (after CategoriesDropdown). */
export const DESKTOP_NAV_ITEMS = [
  { label: 'پرفروش‌ها', href: PATHS.RETAIL.BEST_SELLERS },
  { label: 'تخفیف‌ها', href: PATHS.RETAIL.OFFERS },
  { label: 'درباره ما', href: PATHS.ABOUT },
  { label: 'وبلاگ', href: PATHS.BLOG },
] as const;

export const CATEGORIES_SECTION_TITLE = 'دسته‌بندی';
