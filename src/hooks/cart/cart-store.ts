import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartInvoice, CartLine, CartSeller, CartTotals } from './types';

/** Units inside one shrink pack — mirrors the «شل (۱۲ عددی)» row on the PDP. */
export const UNITS_PER_SHRINK = 12;

/** Free over this order value, per the «ارسال رایگان» card. */
export const FREE_SHIPPING_THRESHOLD = 20_000_000;

export const FLAT_SHIPPING_COST = 250_000;

export interface CartState {
  lines: CartLine[];
  /** Adds a line, or folds the quantities into the matching one. */
  addLine: (line: Omit<CartLine, 'id'>) => void;
  setShrinks: (lineId: string, shrinks: number) => void;
  setUnits: (lineId: string, units: number) => void;
  setPrepayment: (lineId: string, prepayment: number) => void;
  removeLine: (lineId: string) => void;
  /** Drops a whole seller's invoice — used once it is paid. */
  removeSeller: (sellerId: number) => void;
  reset: () => void;
}

export const cartLineId = (sellerId: number, productSlug: string): string =>
  `${sellerId}:${productSlug}`;

/** What one line costs: packs + loose units, less nothing — fees are shown separately. */
export const lineTotal = (line: CartLine): number =>
  line.unitPrice * line.shrinks + (line.unitPrice / UNITS_PER_SHRINK) * line.units;

/**
 * The cart lives entirely in the browser: the backend has no cart, order or
 * checkout endpoint yet (they all 404). Persisting it means a reload or a
 * detour to a product page does not lose the basket. Swap the store's
 * internals for server calls when the endpoints land — the selectors below
 * are what the UI depends on, not the storage.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],

      addLine: (line) =>
        set((state) => {
          const id = cartLineId(line.seller.id, line.productSlug);
          const existing = state.lines.find((item) => item.id === id);

          if (!existing) return { lines: [...state.lines, { ...line, id }] };

          return {
            lines: state.lines.map((item) =>
              item.id === id
                ? {
                    ...item,
                    shrinks: item.shrinks + line.shrinks,
                    units: item.units + line.units,
                  }
                : item,
            ),
          };
        }),

      setShrinks: (lineId, shrinks) =>
        set((state) => ({
          lines: state.lines.map((line) =>
            line.id === lineId ? { ...line, shrinks: Math.max(0, shrinks) } : line,
          ),
        })),

      setUnits: (lineId, units) =>
        set((state) => ({
          lines: state.lines.map((line) =>
            line.id === lineId ? { ...line, units: Math.max(0, units) } : line,
          ),
        })),

      setPrepayment: (lineId, prepayment) =>
        set((state) => ({
          lines: state.lines.map((line) =>
            line.id === lineId ? { ...line, prepayment: Math.max(0, prepayment) } : line,
          ),
        })),

      removeLine: (lineId) =>
        set((state) => ({ lines: state.lines.filter((line) => line.id !== lineId) })),

      removeSeller: (sellerId) =>
        set((state) => ({ lines: state.lines.filter((line) => line.seller.id !== sellerId) })),

      reset: () => set({ lines: [] }),
    }),
    {
      name: 'virashop-cart',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/* =========================================================
   Selectors — derived views the checkout renders
   ========================================================= */

/** Groups the cart into one invoice per seller, in first-added order. */
export const selectInvoices = (lines: CartLine[]): CartInvoice[] => {
  const bySeller = new Map<number, CartInvoice>();

  for (const line of lines) {
    const invoice = bySeller.get(line.seller.id);

    if (invoice) {
      invoice.lines.push(line);
      invoice.total += lineTotal(line);
      continue;
    }

    bySeller.set(line.seller.id, {
      seller: line.seller,
      lines: [line],
      total: lineTotal(line),
    });
  }

  return [...bySeller.values()];
};

export const selectInvoice = (lines: CartLine[], sellerId: number): CartInvoice | undefined =>
  selectInvoices(lines).find((invoice) => invoice.seller.id === sellerId);

/**
 * Money breakdown for a set of lines. «سود شما» is the commission the buyer
 * does NOT pay on a marketplace order, which is what the design labels as
 * their saving.
 */
export const selectTotals = (lines: CartLine[]): CartTotals => {
  const itemsTotal = lines.reduce((sum, line) => sum + lineTotal(line), 0);
  const savings = lines.reduce(
    (sum, line) => sum + (lineTotal(line) * line.commissionPercent) / 100,
    0,
  );
  const shipping =
    itemsTotal >= FREE_SHIPPING_THRESHOLD || itemsTotal === 0 ? 0 : FLAT_SHIPPING_COST;

  return {
    itemsTotal,
    shipping,
    savings,
    savingsPercent: itemsTotal === 0 ? 0 : Math.round((savings / itemsTotal) * 100),
    grandTotal: itemsTotal + shipping - savings,
  };
};

/** Every seller in the cart, for the «فاکتورها» step. */
export const selectSellers = (lines: CartLine[]): CartSeller[] =>
  selectInvoices(lines).map((invoice) => invoice.seller);
