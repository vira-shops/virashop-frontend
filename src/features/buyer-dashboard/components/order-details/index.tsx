'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton, StatusIcon } from '@/components/ui';
import {
  DataTable,
  DescriptionList,
  EmptyState,
  PageHeading,
  SectionPanel,
  type DataTableColumn,
  type DescriptionItem,
} from '@/components/shared';
import type { OrderDetail, OrderLine } from '@/contracts/endpoints/orders';
import { useOrder } from '@/hooks';
import { PATHS } from '@/routes/paths';
import { formatJalaliDate, toFaDigits } from '@/utils/format';
import {
  ORDER_DETAIL_LABELS as L,
  ORDER_DETAIL_SECTIONS,
  ORDER_STATUS_LABELS,
  PAGE_TITLES,
  PAYMENT_STATUS_ICONS,
} from '@/features/buyer-dashboard/constants';
import { Amount } from '@/features/buyer-dashboard/components/orders-table';

interface OrderDetailsProps {
  orderId: string;
}

/**
 * Phones: one label/value row per item. Desktop: a four-column grid whose
 * cells sit label·value side by side, split by hairlines (the design's rhythm).
 */
const INFO_GRID = 'md:grid-cols-4';
const INFO_ITEM = 'md:justify-start md:border-e md:pe-7 md:[&:nth-child(4n)]:border-e-0';

const productHref = (line: OrderLine) => PATHS.RETAIL.PRODUCT(line.productSlug);

const ProductCell: React.FC<{ line: OrderLine }> = ({ line }) => (
  <span className="flex items-center gap-5">
    <span className="rounded-4 relative size-13 shrink-0 overflow-hidden border border-blue-100 bg-white">
      <Image src={line.image} alt="" fill sizes="48px" className="object-contain p-1" />
    </span>
    <span className="text-body-md text-black">{line.name}</span>
  </span>
);

const LINE_COLUMNS: DataTableColumn<OrderLine>[] = [
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

const orderItems = (order: OrderDetail): DescriptionItem[] => {
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
    {
      label: L.paymentStatus,
      value: <StatusIcon status={payment.status} label={payment.label} />,
    },
    { label: L.date, value: formatJalaliDate(order.createdAt) },
  ];
};

const senderItems = (order: OrderDetail): DescriptionItem[] => [
  { label: L.fullName, value: order.sender.fullName },
  { label: L.mobile, value: toFaDigits(order.sender.mobile) },
  { label: L.nationalId, value: toFaDigits(order.sender.nationalId) },
  { label: L.postalCode, value: toFaDigits(order.sender.postalCode) },
  { label: L.plate, value: toFaDigits(order.sender.plate) },
  { label: L.address, value: order.sender.address },
];

/** Phones: each line stacks its product row over a label/value list. */
const MobileLines: React.FC<{ lines: OrderLine[] }> = ({ lines }) => (
  <ul className="flex flex-col divide-y divide-blue-100 md:hidden">
    {lines.map((line) => (
      <li key={line.id} className="flex flex-col gap-5 py-7 first:pt-0 last:pb-0">
        <Link href={productHref(line)}>
          <ProductCell line={line} />
        </Link>
        <DescriptionList
          items={[
            { label: L.unitPrice, value: <Amount value={line.unitPrice} /> },
            { label: L.quantity, value: toFaDigits(line.quantity) },
            { label: L.lineTotal, value: <Amount value={line.total} /> },
          ]}
          className="gap-y-5"
        />
      </li>
    ))}
  </ul>
);

const DetailsSkeleton: React.FC = () => (
  <div
    className="rounded-8 flex flex-col gap-7 border border-blue-100 bg-white p-7"
    aria-busy="true"
  >
    {Array.from({ length: 3 }, (_, index) => (
      <div key={index} className="flex flex-col gap-5">
        <Skeleton className="h-11 w-full rounded-full" />
        <Skeleton className="rounded-4 h-20 w-full" />
      </div>
    ))}
  </div>
);

export const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  const order = useOrder(orderId);

  const heading = (
    <PageHeading
      title={PAGE_TITLES.orderDetails}
      as="h2"
      backHref={PATHS.DASHBOARD.BUYER.ORDERS}
      bordered
      actions={
        order.data?.invoiceUrl ? (
          <Link
            href={order.data.invoiceUrl}
            className="text-caption-lg text-primary hover:underline"
          >
            {L.invoice}
          </Link>
        ) : null
      }
    />
  );

  return (
    <>
      <PageHeading title={PAGE_TITLES.orders} className="max-md:hidden" />
      {heading}

      {order.isLoading && <DetailsSkeleton />}

      {order.isError && <EmptyState variant="inline" message={L.notFound} />}

      {order.data && (
        <div className="rounded-8 flex flex-col gap-11 border border-blue-100 bg-white p-5 md:p-7">
          <SectionPanel title={ORDER_DETAIL_SECTIONS.order}>
            <DescriptionList
              items={orderItems(order.data)}
              className={INFO_GRID}
              itemClassName={INFO_ITEM}
            />
          </SectionPanel>

          <SectionPanel title={ORDER_DETAIL_SECTIONS.sender}>
            <DescriptionList
              items={senderItems(order.data)}
              className={INFO_GRID}
              itemClassName={INFO_ITEM}
            />
          </SectionPanel>

          <SectionPanel title={ORDER_DETAIL_SECTIONS.products} bodyClassName="px-0">
            <div className="max-md:hidden">
              <DataTable
                aria-label={ORDER_DETAIL_SECTIONS.products}
                variant="divided"
                columns={LINE_COLUMNS}
                rows={order.data.items}
                getRowKey={(line) => line.id}
                getRowHref={productHref}
              />
            </div>
            <MobileLines lines={order.data.items} />
          </SectionPanel>
        </div>
      )}
    </>
  );
};
