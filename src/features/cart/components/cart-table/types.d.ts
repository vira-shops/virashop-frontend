import type { ReactNode } from 'react';
import type { CartLine } from '@/hooks';

export interface CartLineHandlers {
  onShrinksChange: (lineId: string, shrinks: number) => void;
  onUnitsChange: (lineId: string, units: number) => void;
  onPrepaymentChange: (lineId: string, prepayment: number) => void;
}

export interface CartTableProps extends CartLineHandlers {
  lines: CartLine[];
}

export interface CartLineRowProps extends CartLineHandlers {
  line: CartLine;
}

export interface MoneyProps {
  /** Tomans. */
  value: number;
  /** `primary` for totals. @default 'default' */
  tone?: 'default' | 'primary';
}

export interface CommissionProps {
  percent: number;
  className?: string;
}

export interface ProductCellProps {
  line: CartLine;
}

export interface StackedRowProps {
  label: string;
  children: ReactNode;
}
