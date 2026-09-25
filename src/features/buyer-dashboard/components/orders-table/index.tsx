'use client';

import * as React from 'react';
import { DataTable } from '@/components/shared';
import { PATHS } from '@/routes/paths';
import { buildOrderColumns } from './columns';
import type { OrdersTableProps } from './types';

export { Amount } from './amount';

/** The buyer's orders as a clickable table — every row opens the order's details. */
export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  loading,
  showProducts = false,
  emptyState,
  'aria-label': ariaLabel,
  className,
}) => {
  const columns = React.useMemo(() => buildOrderColumns(showProducts), [showProducts]);

  return (
    <DataTable
      aria-label={ariaLabel}
      columns={columns}
      rows={orders}
      getRowKey={(order) => order.id}
      getRowHref={(order) => PATHS.DASHBOARD.BUYER.ORDER(order.id)}
      loading={loading}
      emptyState={emptyState}
      className={className}
    />
  );
};
