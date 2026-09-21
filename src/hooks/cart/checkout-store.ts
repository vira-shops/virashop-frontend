import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CheckoutDraft } from './types';

export const EMPTY_CHECKOUT_DRAFT: CheckoutDraft = {
  addressId: null,
  shippingMethodId: null,
  deliveryDayId: null,
  deliveryTimeId: null,
  note: '',
  paymentMethodId: null,
};

export interface CheckoutState {
  /** One draft per seller — invoices are paid one at a time. */
  drafts: Record<number, CheckoutDraft>;
  patchDraft: (sellerId: number, patch: Partial<CheckoutDraft>) => void;
  clearDraft: (sellerId: number) => void;
  reset: () => void;
}

/**
 * The shipping and payment choices a buyer makes while moving through the
 * wizard. Persisted for the same reason the cart is: there is no server-side
 * checkout to hold them, and stepping back to a product must not wipe them.
 */
export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      drafts: {},

      patchDraft: (sellerId, patch) =>
        set((state) => ({
          drafts: {
            ...state.drafts,
            [sellerId]: { ...EMPTY_CHECKOUT_DRAFT, ...state.drafts[sellerId], ...patch },
          },
        })),

      clearDraft: (sellerId) =>
        set((state) => {
          const { [sellerId]: _removed, ...rest } = state.drafts;
          void _removed;
          return { drafts: rest };
        }),

      reset: () => set({ drafts: {} }),
    }),
    {
      name: 'virashop-checkout',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const selectDraft = (
  drafts: Record<number, CheckoutDraft>,
  sellerId: number,
): CheckoutDraft => drafts[sellerId] ?? EMPTY_CHECKOUT_DRAFT;
