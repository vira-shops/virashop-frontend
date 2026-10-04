import * as React from 'react';
import { StatusIcon } from '@/components/ui';
import { ThumbnailStack, type DataTableColumn } from '@/components/shared';
import type { OrderSummary } from '@/contracts/endpoints/orders';
import { formatJalaliDate, toFaDigits } from '@/utils/format';
import { PAYMENT_STATUS_ICONS } from '@/features/buyer-dashboard/constants';
import { Amount } from './amount';
import { DESKTOP_ONLY_CLASS, ORDER_COLUMN_LABELS, ORDER_STATUS_TEXT_CLASSES } from './constants';
import type { OrderCellProps, OrderColumnsOptions } from './types';

const desktopOnly = { cellClassName: DESKTOP_ONLY_CLASS, headerClassName: DESKTOP_ONLY_CLASS };

/** Product thumbnails with the «+N» overflow tile. */
export const OrderThumbnails: React.FC<OrderCellProps> = ({ order, className }) => (
  <ThumbnailStack
    images={order.items.map((item) => ({ src: item.image, alt: item.name }))}
    size="md"
    max={3}
    className={className}
  />
);

/** Payment result chip. */
export const PaymentCell: React.FC<OrderCellProps> = ({ order, className }) => {
  const payment = PAYMENT_STATUS_ICONS[order.paymentStatus];

  return <StatusIcon status={payment.status} label={payment.label} className={className} />;
};

/** Orders table columns — see `OrdersTableVariant` for the two sets. */
export const buildOrderColumns = ({
  variant,
  statusLabels,
}: OrderColumnsOptions): DataTableColumn<OrderSummary>[] => [
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
  variant === 'full'
    ? {
        key: 'products',
        header: ORDER_COLUMN_LABELS.products,
        align: 'center',
        ...desktopOnly,
        render: (order) => <OrderThumbnails order={order} className="justify-center" />,
      }
    : {
        key: 'status',
        header: ORDER_COLUMN_LABELS.status,
        align: 'center',
        ...desktopOnly,
        render: (order) => (
          <span className={ORDER_STATUS_TEXT_CLASSES[order.status]}>
            {statusLabels[order.status]}
          </span>
        ),
      },
  {
    key: 'payment',
    header: ORDER_COLUMN_LABELS.payment,
    align: 'center',
    ...desktopOnly,
    render: (order) => <PaymentCell order={order} className="mx-auto flex" />,
  },
  {
    key: 'date',
    header: ORDER_COLUMN_LABELS.date,
    align: 'center',
    ...desktopOnly,
    render: (order) => <time dateTime={order.createdAt}>{formatJalaliDate(order.createdAt)}</time>,
  },
];
