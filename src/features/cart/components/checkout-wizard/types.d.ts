import type {
  Address,
  DeliveryDay,
  PaymentMethod,
  ShippingMethod,
} from '@/contracts/endpoints/checkout';
import type { CartInvoice, CartTotals, CheckoutDraft, CheckoutStep } from '@/hooks';
import type { Channel } from '@/validations/primitives';

export interface CheckoutWizardProps {
  /**
   * Plain channel value, not the full StorefrontChannel — a Server Component
   * page cannot pass the config across the server→client boundary (its
   * header/footer embed icon components and `paths` embeds functions).
   * Resolved internally.
   */
  channel: Channel;
}

export interface CheckoutViewModel {
  step: CheckoutStep;
  invoices: CartInvoice[];
  /** The invoice being checked out; `undefined` on the «فاکتورها» step. */
  invoice?: CartInvoice;
  /** Totals for the open invoice, or for the whole cart on step 1. */
  totals: CartTotals;
  draft: CheckoutDraft;
  addresses: Address[];
  shippingMethods: ShippingMethod[];
  deliveryDays: DeliveryDay[];
  paymentMethods: PaymentMethod[];
  optionsLoading: boolean;
  /** `false` while the persisted cart is still rehydrating. */
  isReady: boolean;
  /** Blocks «ادامه» until the current step has what it needs. */
  canContinue: boolean;
  openInvoice: (sellerId: number) => void;
  goToStep: (step: CheckoutStep) => void;
  goNext: () => void;
  patchDraft: (patch: Partial<CheckoutDraft>) => void;
  setShrinks: (lineId: string, value: number) => void;
  setUnits: (lineId: string, value: number) => void;
  setPrepayment: (lineId: string, value: number) => void;
  /** Settles the open invoice and returns to the list. */
  payInvoice: () => void;
  storefrontHref: string;
  theme: string;
}

export interface EmptyCartProps {
  /** Where «مشاهده محصولات» leads — the channel's storefront. */
  href: string;
}
