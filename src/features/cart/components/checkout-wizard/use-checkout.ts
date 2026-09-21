'use client';

import * as React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAddresses, useDeliveryOptions, useHydration, usePaymentMethods } from '@/hooks';
import { getStorefrontChannelByChannel } from '@/config/storefront';
import {
  selectDraft,
  selectInvoice,
  selectInvoices,
  selectTotals,
  useCartStore,
  useCheckoutStore,
} from '@/hooks';
import { CHECKOUT_STEPS, INVOICE_PARAM, STEP_PARAM } from '@/features/cart/constants';
import type {
  Address,
  DeliveryDay,
  PaymentMethod,
  ShippingMethod,
} from '@/contracts/endpoints/checkout';
import type { CartInvoice, CartTotals, CheckoutDraft, CheckoutStep } from '@/hooks';
import type { Channel } from '@/validations/primitives';

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

const isCheckoutStep = (value: string | null): value is CheckoutStep =>
  CHECKOUT_STEPS.some((step) => step.id === value);

/**
 * Drives the checkout wizard. Step and invoice live in the URL so a stage is
 * shareable and the back button works; the basket and the buyer's choices
 * live in the persisted stores, because the backend has no cart yet.
 */
export const useCheckout = (channel: Channel): CheckoutViewModel => {
  const config = getStorefrontChannelByChannel(channel);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lines = useCartStore((state) => state.lines);
  const setShrinks = useCartStore((state) => state.setShrinks);
  const setUnits = useCartStore((state) => state.setUnits);
  const setPrepayment = useCartStore((state) => state.setPrepayment);
  const removeSeller = useCartStore((state) => state.removeSeller);

  const drafts = useCheckoutStore((state) => state.drafts);
  const patchDraftInStore = useCheckoutStore((state) => state.patchDraft);
  const clearDraft = useCheckoutStore((state) => state.clearDraft);

  // The persisted basket arrives after mount; rendering before then would
  // flash «سبد خرید شما خالی است» on every load.
  const isReady = useHydration(useCartStore);

  const addressesQuery = useAddresses();
  const deliveryQuery = useDeliveryOptions();
  const paymentQuery = usePaymentMethods();

  const invoiceParam = searchParams.get(INVOICE_PARAM);
  const sellerId = invoiceParam ? Number(invoiceParam) : undefined;
  const stepParam = searchParams.get(STEP_PARAM);

  const invoices = selectInvoices(lines);
  const invoice = sellerId === undefined ? undefined : selectInvoice(lines, sellerId);

  // An invoice that has been paid (or was never there) falls back to the list
  // rather than rendering a dead step.
  const step: CheckoutStep = !invoice ? 'invoices' : isCheckoutStep(stepParam) ? stepParam : 'cart';

  const draft = selectDraft(drafts, sellerId ?? 0);
  const totals = selectTotals(invoice ? invoice.lines : lines);

  const pushParams = React.useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined) params.delete(key);
        else params.set(key, value);
      });

      const search = params.toString();

      window.history.pushState(null, '', search ? `${pathname}?${search}` : pathname);
    },
    [pathname, searchParams],
  );

  const goToStep = React.useCallback(
    (next: CheckoutStep) =>
      pushParams(
        next === 'invoices'
          ? { [STEP_PARAM]: undefined, [INVOICE_PARAM]: undefined }
          : { [STEP_PARAM]: next },
      ),
    [pushParams],
  );

  const canContinue = (() => {
    if (step === 'cart') return (invoice?.lines.length ?? 0) > 0;
    if (step === 'shipping') {
      return Boolean(draft.addressId && draft.shippingMethodId && draft.deliveryTimeId);
    }
    if (step === 'payment') return Boolean(draft.paymentMethodId);
    return true;
  })();

  return {
    step,
    invoices,
    invoice,
    totals,
    draft,
    addresses: addressesQuery.data ?? [],
    shippingMethods: deliveryQuery.data?.methods ?? [],
    deliveryDays: deliveryQuery.data?.days ?? [],
    paymentMethods: paymentQuery.data ?? [],
    optionsLoading: addressesQuery.isLoading || deliveryQuery.isLoading || paymentQuery.isLoading,
    isReady,
    canContinue,
    openInvoice: (id) => pushParams({ [INVOICE_PARAM]: String(id), [STEP_PARAM]: 'cart' }),
    goToStep,
    goNext: () => {
      const index = CHECKOUT_STEPS.findIndex((entry) => entry.id === step);
      const next = CHECKOUT_STEPS[index + 1];

      if (next) goToStep(next.id);
    },
    patchDraft: (patch) => sellerId !== undefined && patchDraftInStore(sellerId, patch),
    setShrinks,
    setUnits,
    setPrepayment,
    payInvoice: () => {
      if (sellerId === undefined) return;

      removeSeller(sellerId);
      clearDraft(sellerId);
      goToStep('invoices');
    },
    storefrontHref: config.paths.ROOT,
    theme: config.segment,
  };
};
