export const FAVORITES_EMPTY = { message: 'متاسفانه کالایی وجود', highlight: 'ندارد' } as const;

export const FAVORITE_COPY = {
  remove: 'حذف از علاقه‌مندی‌ها',
  addToCart: 'افزودن به سبد خرید',
  unavailable: 'ناموجود',
  discount: (percent: string) => `${percent}٪`,
  countdownLabel: 'زمان باقی‌مانده تخفیف',
} as const;

export const SKELETON_COUNT = 8;

/** One column of rows on phones, a card grid from `md`. */
export const FAVORITES_GRID_CLASS =
  'grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7 lg:grid-cols-3 xl:grid-cols-4';

/** Phones: image beside the text. From `md`: image above the text (the card). */
export const CARD_CLASS =
  'rounded-8 relative flex h-full gap-5 bg-white p-5 shadow-sm md:flex-col md:gap-7 md:p-7';

/*
 * Fixed-height rows keep every card in a grid row identical, whatever the
 * item has: a one- or two-line name, a discount or not, in stock or not.
 */

/** Always two lines tall — short names do not pull the prices up. */
export const TITLE_CLASS = 'line-clamp-2 h-[2lh] leading-8 text-gray-700';

/** Old price + countdown; reserved (empty) when the item is not discounted. */
export const SALE_ROW_CLASS = 'text-caption-md flex h-[1lh] items-center justify-between gap-3';

/** Price + cart, or «ناموجود» — same height either way (the cart button's). */
export const PRICE_ROW_CLASS = 'flex h-11 items-center justify-between gap-3';

/** 88px thumbnail on phones (clear of the «×» above it); full-width square from `md`. */
export const IMAGE_BOX_CLASS =
  'relative size-17 shrink-0 max-md:order-last max-md:mt-8 md:aspect-square md:size-auto md:w-full';
