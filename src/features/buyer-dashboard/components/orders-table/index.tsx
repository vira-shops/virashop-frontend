'use client';

import * as React from 'react';
import { StatusIcon } from '@/components/ui';
import { DataTable, ThumbnailStack, type DataTableColumn } from '@/components/shared';
import type { OrderSummary } from '@/contracts/endpoints/orders';
import { PATHS } from '@/routes/paths';
import { cn } from '@/utils/ui';
import { formatJalaliDate, formatToman, toFaDigits } from '@/utils/format';
import {
  CURRENCY_LABEL,
  ORDER_COLUMN_LABELS,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_TEXT_CLASSES,
  PAYMENT_STATUS_ICONS,
} from '@/features/buyer-dashboard/constants';

export interface OrdersTableProps {
  orders: OrderSummary[];
  loading?: boolean;
  /** Adds the product-thumbnail column (the orders page; the dashboard omits it). */
  showProducts?: boolean;
  emptyState?: React.ReactNode;
  'aria-label'?: string;
  className?: string;
}

/** Desktop-only columns — phones keep tracking code + amount, as the design does. */
const DESKTOP_ONLY = 'max-md:hidden';

export const Amount: React.FC<{ value: number; className?: string }> = ({ value, className }) => (
  <span className={cn('inline-flex items-baseline gap-1 whitespace-nowrap', className)}>
    <span className="font-medium">{formatToman(value)}</span>
    <span className="text-caption-md text-blue-300">{CURRENCY_LABEL}</span>
  </span>
);

const buildColumns = (showProducts: boolean): DataTableColumn<OrderSummary>[] => [
  {
    key: 'trackingCode',
    header: ORDER_COLUMN_LABELS.trackingCode,
    render: (order) => <span className="font-medium">{toFaDigits(order.trackingCode)}</span>,
  },
  {
    key: 'amount',
    header: ORDER_COLUMN_LABELS.amount,
    align: 'center',
    render: (order) => <Amount value={order.total} />,
  },
  ...(showProducts
    ? [
        {
          key: 'products',
          header: ORDER_COLUMN_LABELS.products,
          align: 'center',
          cellClassName: DESKTOP_ONLY,
          headerClassName: DESKTOP_ONLY,
          render: (order) => (
            <ThumbnailStack
              images={order.items.map((item) => ({ src: item.image, alt: item.name }))}
              size="sm"
              className="justify-center"
            />
          ),
        } satisfies DataTableColumn<OrderSummary>,
      ]
    : []),
  {
    key: 'status',
    header: ORDER_COLUMN_LABELS.status,
    align: 'center',
    cellClassName: DESKTOP_ONLY,
    headerClassName: DESKTOP_ONLY,
    render: (order) => (
      <span className={ORDER_STATUS_TEXT_CLASSES[order.status]}>
        {ORDER_STATUS_LABELS[order.status]}
      </span>
    ),
  },
  {
    key: 'payment',
    header: ORDER_COLUMN_LABELS.payment,
    align: 'center',
    cellClassName: DESKTOP_ONLY,
    headerClassName: DESKTOP_ONLY,
    render: (order) => {
      const payment = PAYMENT_STATUS_ICONS[order.paymentStatus];

      return <StatusIcon status={payment.status} label={payment.label} className="mx-auto flex" />;
    },
  },
  {
    key: 'date',
    header: ORDER_COLUMN_LABELS.date,
    align: 'center',
    cellClassName: DESKTOP_ONLY,
    headerClassName: DESKTOP_ONLY,
    render: (order) => <time dateTime={order.createdAt}>{formatJalaliDate(order.createdAt)}</time>,
  },
];

/** The buyer's orders as a clickable table — every row opens the order's details. */
export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  loading,
  showProducts = false,
  emptyState,
  'aria-label': ariaLabel,
  className,
}) => {
  const columns = React.useMemo(() => buildColumns(showProducts), [showProducts]);

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
