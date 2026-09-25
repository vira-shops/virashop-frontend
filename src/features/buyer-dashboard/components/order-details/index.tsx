'use client';

import * as React from 'react';
import { Button } from '@/components/ui';
import {
  DataTable,
  DescriptionList,
  EmptyState,
  PageHeading,
  SectionPanel,
} from '@/components/shared';
import { useOrder } from '@/hooks';
import { PATHS } from '@/routes/paths';
import { PAGE_TITLES } from '@/features/buyer-dashboard/constants';
import {
  DETAILS_CARD_CLASS,
  INFO_GRID_CLASS,
  INFO_ITEM_CLASS,
  ORDER_DETAIL_LABELS as L,
  ORDER_DETAIL_SECTIONS,
} from './constants';
import { DetailsSkeleton } from './details-skeleton';
import { LINE_COLUMNS, buildOrderItems, buildSenderItems } from './items';
import { MobileLines } from './mobile-lines';
import { productHref } from './product-cell';
import type { OrderDetailsProps } from './types';

/** One order — order info, sender info and its product lines. */
export const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  const order = useOrder(orderId);
  const invoiceUrl = order.data?.invoiceUrl;

  return (
    <>
      <PageHeading title={PAGE_TITLES.orders} className="max-md:hidden" />
      <PageHeading
        title={PAGE_TITLES.orderDetails}
        as="h2"
        backHref={PATHS.DASHBOARD.BUYER.ORDERS}
        bordered
        actions={
          invoiceUrl ? (
            <Button variant="ghost" size="xs" href={invoiceUrl}>
              {L.invoice}
            </Button>
          ) : null
        }
      />

      {order.isLoading && <DetailsSkeleton />}

      {order.isError && <EmptyState variant="inline" message={L.notFound} />}

      {order.data && (
        <div className={DETAILS_CARD_CLASS}>
          <SectionPanel title={ORDER_DETAIL_SECTIONS.order}>
            <DescriptionList
              items={buildOrderItems(order.data)}
              className={INFO_GRID_CLASS}
              itemClassName={INFO_ITEM_CLASS}
            />
          </SectionPanel>

          <SectionPanel title={ORDER_DETAIL_SECTIONS.sender}>
            <DescriptionList
              items={buildSenderItems(order.data)}
              className={INFO_GRID_CLASS}
              itemClassName={INFO_ITEM_CLASS}
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
