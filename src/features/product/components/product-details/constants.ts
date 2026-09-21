import type { SellerOfferSort } from '@/contracts/endpoints/products';

/** «فروشنده ها» ordering tabs — the design's three, in its order. */
export const SELLER_SORT_OPTIONS: { value: SellerOfferSort; label: string }[] = [
  { value: 'cheapest', label: 'ارزان ترین' },
  { value: 'nearest', label: 'نزدیک ترین' },
  { value: 'best', label: 'مناسب ترین' },
];

export const SELLERS_TITLE = 'فروشنده ها';
export const PRICE_FROM_LABEL = 'قیمت از';
export const CURRENCY_LABEL = 'تومان';
export const CHEAPEST_TAG = 'ارزان ترین';

/** Sellers shown before «نمایش N فروشگاه دیگر» takes over. */
export const SELLER_OFFERS_VISIBLE = 3;

/** Gallery/PDP images are storage keys, not URLs, until the media layer lands. */
export const PRODUCT_IMAGE_FALLBACK = '/images/landing/big-offer/01.png';

export const BEST_SELLERS_LINK_LABEL = 'مشاهده همه';
