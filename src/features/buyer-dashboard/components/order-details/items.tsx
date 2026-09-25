import * as React from 'react';
import { StatusIcon } from '@/components/ui';
import type { DataTableColumn, DescriptionItem } from '@/components/shared';
import type { OrderDetail, OrderLine } from '@/contracts/endpoints/orders';
import { formatJalaliDate, toFaDigits } from '@/utils/format';
import { ORDER_STATUS_LABELS, PAYMENT_STATUS_ICONS } from '@/features/buyer-dashboard/constants';
import { Amount } from '@/features/buyer-dashboard/components/orders-table';
import { ORDER_DETAIL_LABELS as L } from './constants';
import { ProductCell } from './product-cell';

/** «اطلاعات سفارش» rows. */
export const buildOrderItems = (order: OrderDetail): DescriptionItem[] => {
  const payment = PAYMENT_STATUS_ICONS[order.paymentStatus];

  return [
    { label: L.trackingCode, value: toFaDigits(order.trackingCode) },
    { label: L.paymentMethod, value: order.paymentMethod },
    { label: L.shippingMethod, value: order.shippingMethod },
    {
      label: L.shippingCost,
      value: order.shippingCost === 0 ? L.free : <Amount value={order.shippingCost} />,
    },
    { label: L.subtotal, value: <Amount value={order.subtotal} /> },
    { label: L.total, value: <Amount value={order.total} /> },
    { label: L.status, value: ORDER_STATUS_LABELS[order.status] },
    { label: L.paymentStatus, value: <StatusIcon status={payment.status} label={payment.label} /> },
    { label: L.date, value: formatJalaliDate(order.createdAt) },
  ];
};

/** «اطلاعات فرستنده» rows. */
export const buildSenderItems = ({ sender }: OrderDetail): DescriptionItem[] => [
  { label: L.fullName, value: sender.fullName },
  { label: L.mobile, value: toFaDigits(sender.mobile) },
  { label: L.nationalId, value: toFaDigits(sender.nationalId) },
  { label: L.postalCode, value: toFaDigits(sender.postalCode) },
  { label: L.plate, value: toFaDigits(sender.plate) },
  { label: L.address, value: sender.address },
];

/** A product line's price rows — the stacked phone layout. */
export const buildLineItems = (line: OrderLine): DescriptionItem[] => [
  { label: L.unitPrice, value: <Amount value={line.unitPrice} /> },
  { label: L.quantity, value: toFaDigits(line.quantity) },
  { label: L.lineTotal, value: <Amount value={line.total} /> },
];

/** Desktop products table columns. */
export const LINE_COLUMNS: DataTableColumn<OrderLine>[] = [
  { key: 'product', header: '', render: (line) => <ProductCell line={line} /> },
  {
    key: 'unitPrice',
    header: L.unitPrice,
    align: 'center',
    render: (line) => <Amount value={line.unitPrice} />,
  },
  {
    key: 'quantity',
    header: L.quantity,
    align: 'center',
    render: (line) => toFaDigits(line.quantity),
  },
  {
    key: 'total',
    header: L.lineTotal,
    align: 'center',
    render: (line) => <Amount value={line.total} />,
  },
];
