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
export const PRICE_LABEL = 'قیمت';
export const ADD_TO_CART_LABEL = 'افزودن به سبد خرید';
export const TARIFFS_TITLE = 'تعرفه‌ها';
export const INSTALLMENTS_TITLE = 'قیمت / اقساط';
export const SHRINK_TITLE = 'طرح فروش شیرینگ';
export const ATTRIBUTES_TITLE = 'مشخصات محصول / شرایط پرداخت';
export const MORE_LABEL = 'بیشتر';
/** Query param carrying the selected seller offer on the PDP. */
export const SELLER_PARAM = 'seller';

/** Sellers shown before «نمایش N فروشگاه دیگر» takes over. */
export const SELLER_OFFERS_VISIBLE = 3;

/** Gallery/PDP images are storage keys, not URLs, until the media layer lands. */
export const PRODUCT_IMAGE_FALLBACK = '/images/landing/big-offer/01.png';

export const BEST_SELLERS_LINK_LABEL = 'مشاهده همه';

/** Vira calculator: terms sit three to a line in both designs. */
export const CALCULATOR_TERMS_PER_LINE = 3;

/** Vira calculator: outlined pill, not the gray one — the calculator draws its own steppers. */
export const CALCULATOR_STEPPER_CLASS = 'rounded-4 border-primary h-12 w-[150px] border bg-white';

/** Copy of the PDP parts (seller cards, buy bar, calculator, …). */
export const PRODUCT_PARTS_COPY = {
  buyFrom: (shopName: string) => `خرید از ${shopName}`,
  addToFavorites: 'افزودن به علاقه‌مندی‌ها',
  addToCompare: 'افزودن به مقایسه',
  discountChip: (percent: string) => `تخفیف ${percent}٪`,
  installmentsChip: (months: string) => `اقساط ${months} ماهه`,
  commissionChip: (percent: string) => `کارمزد ${percent}٪`,
  membershipChip: (years: string) => `${years} سال عضویت`,
  featured: 'ویژه',
  lastUpdated: (date: string) => `آخرین تغییرات ${date}`,
  shippingType: (type: string) => `نوع ارسال: ${type}`,
  stock: (label: string) => `موجودی: ${label}`,
  buy: 'خرید',
  backToSellers: 'بازگشت به فهرست فروشندگان',
  seller: (shopName: string) => `فروشنده: ${shopName}`,
  moreSellers: (count: string) => `نمایش ${count} فروشگاه دیگر`,
  calculatorTitle: 'ماشین حساب ویرا',
  paymentTerms: 'شرایط پرداخت',
} as const;
