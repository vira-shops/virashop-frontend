import type { ReactNode } from 'react';
import type { OrderSummary } from '@/contracts/endpoints/orders';

export interface OrdersTableProps {
  orders: OrderSummary[];
  loading?: boolean;
  /** Adds the product-thumbnail column (the orders page; the dashboard omits it). */
  showProducts?: boolean;
  emptyState?: ReactNode;
  'aria-label'?: string;
  className?: string;
}

export interface AmountProps {
  /** Tomans. */
  value: number;
  className?: string;
}
