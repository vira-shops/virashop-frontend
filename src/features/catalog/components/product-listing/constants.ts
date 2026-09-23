import type { ProductSort } from '@/contracts/endpoints/products';

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

export const CATALOG_PAGE_SIZE = 20;
export const CATALOG_PRICE_MIN = 0;

export const CATALOG_SEARCH_PLACEHOLDER = 'جست و جو...';

/** `imageKey` is a storage key, not a URL — categories have no resolved image yet. */
/** Re-exported so the listing and the category landing never drift apart. */
export { CATEGORY_IMAGE_FALLBACK } from '@/hooks';
export const PRODUCT_IMAGE_FALLBACK = '/images/landing/big-offer/01.png';
