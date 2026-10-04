'use client';

import * as React from 'react';
import { DataTable } from '@/components/shared';
import { getBuyerChannel } from '@/features/buyer-dashboard/constants';
import { buildOrderColumns } from './columns';
import type { OrdersTableProps } from './types';

export { Amount } from './amount';
export { OrderThumbnails, PaymentCell } from './columns';

/** The buyer's orders as a clickable table — every row opens the order's details. */
export const OrdersTable: React.FC<OrdersTableProps> = ({
  channel,
  orders,
  loading,
  variant = 'recent',
  emptyState,
  'aria-label': ariaLabel,
  className,
}) => {
  const { paths, orderStatusLabels } = getBuyerChannel(channel);
  const columns = React.useMemo(
    () => buildOrderColumns({ variant, statusLabels: orderStatusLabels }),
    [variant, orderStatusLabels],
  );

  return (
    <DataTable
      aria-label={ariaLabel}
      columns={columns}
      rows={orders}
      getRowKey={(order) => order.id}
      getRowHref={(order) => paths.ORDER(order.id)}
      loading={loading}
      emptyState={emptyState}
      className={className}
    />
  );
};
