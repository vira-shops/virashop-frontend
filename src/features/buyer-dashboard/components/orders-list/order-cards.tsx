import * as React from 'react';
import Link from 'next/link';
import { DescriptionList } from '@/components/shared';
import { formatJalaliDate, toFaDigits } from '@/utils/format';
import { getBuyerChannel } from '@/features/buyer-dashboard/constants';
import {
  Amount,
  OrderThumbnails,
  PaymentCell,
} from '@/features/buyer-dashboard/components/orders-table';
import { ORDER_CARD_LABELS as L } from './constants';
import type { OrderCardsProps } from './types';

/** Phones: one labelled card per order instead of the table (per the design). */
export const OrderCards: React.FC<OrderCardsProps> = ({ channel, orders, 'aria-label': label }) => {
  const { paths } = getBuyerChannel(channel);

  return (
    <ul aria-label={label} className="flex flex-col divide-y divide-blue-100">
      {orders.map((order) => (
        <li key={order.id} className="flex flex-col gap-5 py-7 first:pt-0 last:pb-0">
          <DescriptionList
            className="gap-y-5"
            items={[
              { label: L.trackingCode, value: toFaDigits(order.trackingCode) },
              { label: L.amount, value: <Amount value={order.total} /> },
              { label: L.products, value: <OrderThumbnails order={order} /> },
              { label: L.payment, value: <PaymentCell order={order} /> },
              {
                label: L.date,
                value: <time dateTime={order.createdAt}>{formatJalaliDate(order.createdAt)}</time>,
              },
            ]}
          />
          <Link
            href={paths.ORDER(order.id)}
            className="text-caption-md hover:text-primary w-fit text-gray-300"
          >
            {L.details}
          </Link>
        </li>
      ))}
    </ul>
  );
};
