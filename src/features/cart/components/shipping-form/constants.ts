export const SHIPPING_FORM_COPY = {
  addressTitle: 'انتخاب آدرس',
  addAddress: 'اضافه کردن آدرس جدید',
  shippingTypeTitle: 'نوع ارسال',
  deliveryDateTitle: 'تاریخ تحویل',
  notePlaceholder: 'یادداشت...',
} as const;

/** Radio-group `name`s — one per section. */
export const RADIO_GROUPS = {
  address: 'checkout-address',
  shipping: 'checkout-shipping',
  time: 'checkout-time',
} as const;

export const SKELETON_SECTION_COUNT = 3;

export const CARD_CLASS = 'rounded-8 border border-gray-100 bg-white p-7';

/** The picked day tile vs. idle / holiday tiles. */
export const DAY_TILE_CLASS =
  'rounded-4 flex size-14 shrink-0 flex-col items-center justify-center border transition-colors';
export const DAY_TILE_SELECTED_CLASS = 'border-primary bg-primary text-white';
export const DAY_TILE_IDLE_CLASS = 'border-gray-300 bg-white text-black hover:border-gray-700';
/** A holiday keeps its red label until it is the picked day. */
export const DAY_TILE_HOLIDAY_CLASS =
  'border-gray-300 bg-white text-warning-red hover:border-gray-700';
