import type { ProductSort } from '@/contracts/endpoints/products';

/*
 * Feature-wide constants only — anything used by a single component lives in
 * that component's own `constants.ts`.
 */

/**
 * Sort options shown both as the desktop tab row and as the mobile
 * «مرتب سازی» sheet — one list so the two views can never drift.
 */
export const CATALOG_SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: 'relevant', label: 'همه' },
  { value: 'newest', label: 'جدید ترین' },
  { value: 'bestselling', label: 'پر فروش ترین ها' },
  { value: 'cheapest', label: 'ارزان ترین ها' },
  { value: 'expensive', label: 'گران ترین' },
  { value: 'discounted', label: 'تخفیفات' },
];

/** Lower bound of the price filter (filters panel + listing query). */
export const CATALOG_PRICE_MIN = 0;

/** Toolbar button + sort sheet + sort tabs. */
export const SORT_LABEL = 'مرتب سازی';

/** Toolbar button + the mobile filter sheet. */
export const FILTER_LABEL = 'فیلتر';

/** Filter + sort bottom sheets: icon after the title, pinned to the start (per the mock). */
export const SHEET_HEADER_CLASS = 'flex-row-reverse justify-end gap-3';
