import * as React from 'react';
import { StatusIcon } from '@/components/ui';
import { ThumbnailStack, type DataTableColumn } from '@/components/shared';
import type { OrderSummary } from '@/contracts/endpoints/orders';
import { formatJalaliDate, toFaDigits } from '@/utils/format';
import { ORDER_STATUS_LABELS, PAYMENT_STATUS_ICONS } from '@/features/buyer-dashboard/constants';
import { Amount } from './amount';
import { DESKTOP_ONLY_CLASS, ORDER_COLUMN_LABELS, ORDER_STATUS_TEXT_CLASSES } from './constants';

const desktopOnly = { cellClassName: DESKTOP_ONLY_CLASS, headerClassName: DESKTOP_ONLY_CLASS };

const PRODUCTS_COLUMN: DataTableColumn<OrderSummary> = {
  key: 'products',
  header: ORDER_COLUMN_LABELS.products,
  align: 'center',
  ...desktopOnly,
  render: (order) => (
    <ThumbnailStack
      images={order.items.map((item) => ({ src: item.image, alt: item.name }))}
      size="sm"
      className="justify-center"
    />
  ),
};

/** Orders table columns; the thumbnail column is optional (orders page only). */
export const buildOrderColumns = (showProducts: boolean): DataTableColumn<OrderSummary>[] => [
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
  ...(showProducts ? [PRODUCTS_COLUMN] : []),
  {
    key: 'status',
    header: ORDER_COLUMN_LABELS.status,
    align: 'center',
    ...desktopOnly,
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
    ...desktopOnly,
    render: (order) => {
      const payment = PAYMENT_STATUS_ICONS[order.paymentStatus];

      return <StatusIcon status={payment.status} label={payment.label} className="mx-auto flex" />;
    },
  },
  {
    key: 'date',
    header: ORDER_COLUMN_LABELS.date,
    align: 'center',
    ...desktopOnly,
    render: (order) => <time dateTime={order.createdAt}>{formatJalaliDate(order.createdAt)}</time>,
  },
];
