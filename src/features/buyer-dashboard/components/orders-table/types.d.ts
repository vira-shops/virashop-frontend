import type { ReactNode } from 'react';
import type { OrderStatus, OrderSummary } from '@/contracts/endpoints/orders';
import type { Channel } from '@/validations/primitives';

/**
 * `recent` — the dashboard's latest orders, with a status column.
 * `full` — the orders page: product thumbnails instead of status (the tabs
 * already say which status is listed).
 */
export type OrdersTableVariant = 'recent' | 'full';

export interface OrdersTableProps {
  channel: Channel;
  orders: OrderSummary[];
  loading?: boolean;
  /** @default 'recent' */
  variant?: OrdersTableVariant;
  emptyState?: ReactNode;
  'aria-label'?: string;
  className?: string;
}

export interface OrderColumnsOptions {
  variant: OrdersTableVariant;
  statusLabels: Record<OrderStatus, string>;
}

export interface OrderCellProps {
  order: OrderSummary;
  className?: string;
}

export interface AmountProps {
  /** Tomans. */
  value: number;
  className?: string;
}
