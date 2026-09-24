import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

/**
 * `striped` — every other body row sits on a soft tinted, rounded band (the
 * dashboard's recent-orders list). `divided` — hairlines between rows (the
 * order-details products list).
 */
export type TableVariant = 'striped' | 'divided';

export type TableAlign = 'start' | 'center' | 'end';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** @default 'striped' */
  variant?: TableVariant;
  className?: string;
  /** The scroll wrapper — the table scrolls sideways instead of squeezing on narrow screens. */
  wrapperClassName?: string;
}

export type TableSectionProps = HTMLAttributes<HTMLTableSectionElement>;

export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** @default 'start' */
  align?: TableAlign;
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** @default 'start' */
  align?: TableAlign;
}
