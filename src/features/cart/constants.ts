import type { CheckoutStep } from '@/hooks';

/** The wizard's stages, in the order the progress bar draws them (RTL). */
export const CHECKOUT_STEPS: { id: CheckoutStep; label: string }[] = [
  { id: 'invoices', label: 'فاکتورها' },
  { id: 'cart', label: 'سبد خرید' },
  { id: 'shipping', label: 'ارسال' },
  { id: 'payment', label: 'پرداخت' },
];

/** Query params driving the wizard — kept in the URL so steps are shareable. */
export const INVOICE_PARAM = 'invoice';
export const STEP_PARAM = 'step';
export const CHANNEL_PARAM = 'channel';

export const CURRENCY_LABEL = 'تومان';
export const FREE_LABEL = 'رایگان';

/* --- Aside --- */
export const ITEMS_TOTAL_LABEL = 'قیمت کالاها';
export const SHIPPING_LABEL = 'حمل نقل';
export const SAVINGS_LABEL = 'سود شما';
export const GRAND_TOTAL_LABEL = 'جمع کل';
export const PAYABLE_LABEL = 'مبلغ کل';
export const CONTINUE_LABEL = 'ادامه';
export const PAY_LABEL = 'پرداخت';
export const FREE_SHIPPING_TITLE = 'ارسال رایگان';
export const FREE_SHIPPING_NOTE = 'خرید بالای ۲۰ میلیون تومان';

/* --- Cart table --- */
export const CART_COLUMNS = {
  unitPrice: 'مبلغ ( ۱ شل )',
  commission: 'کارمزد',
  shrinks: 'شل',
  units: 'دانه',
  prepayment: 'پیش پرداخت',
  total: 'جمع کل',
} as const;

/** Step of the «پیش پرداخت» stepper, in tomans. */
export const PREPAYMENT_STEP = 100_000;

/* --- Shipping --- */
export const ADDRESS_TITLE = 'انتخاب آدرس';
export const ADD_ADDRESS_LABEL = 'اضافه کردن آدرس جدید';
export const SHIPPING_TYPE_TITLE = 'نوع ارسال';
export const DELIVERY_DATE_TITLE = 'تاریخ تحویل';
export const NOTE_PLACEHOLDER = 'یادداشت...';

/* --- Payment --- */
export const PAYMENT_TYPE_LABEL = 'نوع پرداخت';

/* --- Empty state --- */
export const EMPTY_CART_TITLE = 'سبد خرید شما خالی است';
export const EMPTY_CART_ACTION = 'مشاهده محصولات';

/** Product images are storage keys, not URLs, until the media layer lands. */
export const CART_IMAGE_FALLBACK = '/images/landing/big-offer/01.png';

/** Seller thumbnails shown on an invoice card before the «+N» counter. */
export const INVOICE_THUMBNAILS = 3;
