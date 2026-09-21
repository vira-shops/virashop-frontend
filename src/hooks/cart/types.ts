/** One line of the cart — a product bought from one specific seller. */
export interface CartLine {
  /** `${sellerId}:${productSlug}` — a product from two sellers is two lines. */
  id: string;
  productSlug: string;
  name: string;
  imageUrl: string | null;
  seller: CartSeller;
  /** Tomans for a single shrink («مبلغ ( ۱ شل )»). */
  unitPrice: number;
  /** Marketplace fee on this line, «کارمزد». */
  commissionPercent: number;
  /** «شل» — packs. */
  shrinks: number;
  /** «دانه» — loose units on top of the packs. */
  units: number;
  /** «پیش پرداخت» — tomans paid up front; the rest is on credit. */
  prepayment: number;
}

export interface CartSeller {
  id: number;
  shopName: string;
  logoUrl: string | null;
}

/** The cart grouped by seller — one invoice per storefront. */
export interface CartInvoice {
  seller: CartSeller;
  lines: CartLine[];
  /** Sum of every line's total. */
  total: number;
}

/** Money breakdown shown in the checkout aside. */
export interface CartTotals {
  /** «قیمت کالاها» before the discount. */
  itemsTotal: number;
  /** «حمل نقل»; `0` renders as «رایگان». */
  shipping: number;
  /** «سود شما» — what the buyer saves, in tomans. */
  savings: number;
  /** Whole-percent form of `savings`, for the «(۱۲٪)» suffix. */
  savingsPercent: number;
  /** «جمع کل». */
  grandTotal: number;
}

/** The four checkout stages, in the order the progress bar shows them. */
export type CheckoutStep = 'invoices' | 'cart' | 'shipping' | 'payment';

/** Per-invoice checkout choices, kept while the buyer moves between steps. */
export interface CheckoutDraft {
  addressId: number | null;
  shippingMethodId: string | null;
  deliveryDayId: string | null;
  deliveryTimeId: string | null;
  note: string;
  paymentMethodId: string | null;
}
