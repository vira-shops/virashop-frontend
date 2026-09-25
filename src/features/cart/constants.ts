import type { CheckoutStep } from '@/hooks';

/*
 * Feature-wide constants only — anything used by a single component lives in
 * that component's own `constants.ts`.
 */

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

/** Invoice list + checkout summary. */
export const GRAND_TOTAL_LABEL = 'جمع کل';

/** Invoice list + the wizard's payment-step action. */
export const PAY_LABEL = 'پرداخت';

/** Product images are storage keys, not URLs, until the media layer lands. */
export const CART_IMAGE_FALLBACK = '/images/landing/big-offer/01.png';
