import type { ReactNode } from 'react';
import type { CartTotals } from '@/hooks';

/** `full` is the four-row breakdown; `total` is the single «مبلغ کل» row of the payment step. */
export type CheckoutSummaryVariant = 'full' | 'total';

export interface CheckoutSummaryAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface CheckoutSummaryProps {
  totals: CartTotals;
  /** @default 'full' */
  variant?: CheckoutSummaryVariant;
  action?: CheckoutSummaryAction;
}

export interface SummaryRowProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export interface SummaryAmountProps {
  /** Tomans; `null` renders the free label. */
  value: number | null;
  /** Highlighted totals are in the primary color. */
  highlight?: boolean;
}
