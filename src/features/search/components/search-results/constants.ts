import type { ProductCard, ProductSort } from '@/contracts/endpoints/products';

export const SEARCH_PAGE_SIZE = 20;

export const SEARCH_SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: 'relevant', label: 'مرتبط‌ترین' },
  { value: 'cheapest', label: 'ارزان‌ترین' },
  { value: 'newest', label: 'جدیدترین' },
];

export const STOCK_NOTE: Record<ProductCard['stockStatus'], string | undefined> = {
  IN_STOCK: undefined,
  LOW_STOCK: 'موجودی محدود',
  OUT_OF_STOCK: 'ناموجود',
};

export const SEARCH_RESULTS_COPY = {
  title: (query: string) => `نتایج جستجو برای «${query}»`,
  resultCount: (total: string) => `${total} محصول`,
  empty: 'محصولی برای این جستجو یافت نشد',
  view: 'مشاهده',
  discount: (percent: string) => `${percent}٪`,
} as const;

/** Product images are storage keys, not URLs, until the media layer lands. */
export const SEARCH_IMAGE_FALLBACK = '/images/landing/big-offer/01.png';
