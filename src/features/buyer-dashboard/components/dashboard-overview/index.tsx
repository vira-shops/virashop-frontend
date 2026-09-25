'use client';

import * as React from 'react';
import { BoxIcon } from '@icons';
import { Typography } from '@/components/ui';
import { AnnouncementCarousel, EmptyState, PageHeading, StatCard } from '@/components/shared';
import { useAnnouncements, useOrderStats, useOrders } from '@/hooks';
import { PATHS } from '@/routes/paths';
import { ORDERS_EMPTY, PAGE_TITLES } from '@/features/buyer-dashboard/constants';
import { OrdersTable } from '@/features/buyer-dashboard/components/orders-table';
import {
  ORDER_STAT_CARDS,
  RECENT_ORDERS_HEADING_ID,
  RECENT_ORDERS_LIMIT,
  RECENT_ORDERS_TITLE,
} from './constants';

/** Buyer dashboard home — announcements, order KPIs and the latest orders. */
export const DashboardOverview: React.FC = () => {
  const announcements = useAnnouncements();
  const stats = useOrderStats();
  const recent = useOrders({ limit: RECENT_ORDERS_LIMIT });

  const slides = (announcements.data ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    body: item.body,
    href: item.href ?? undefined,
  }));

  return (
    <>
      <PageHeading title={PAGE_TITLES.dashboard} />

      <AnnouncementCarousel items={slides} illustrationClassName="max-md:hidden" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-7">
        {ORDER_STAT_CARDS.map((card) => (
          <StatCard
            key={card.status}
            label={card.label}
            value={stats.data?.[card.status] ?? 0}
            icon={<BoxIcon />}
            loading={stats.isLoading}
            href={`${PATHS.DASHBOARD.BUYER.ORDERS}?status=${card.status}`}
          />
        ))}
      </div>

      <section aria-labelledby={RECENT_ORDERS_HEADING_ID} className="flex flex-col gap-5">
        <Typography id={RECENT_ORDERS_HEADING_ID} variant="h6" as="h2" className="text-blue-900">
          {RECENT_ORDERS_TITLE}
        </Typography>
        <div className="rounded-8 border border-blue-100 bg-white p-5 md:p-7">
          <OrdersTable
            aria-label={RECENT_ORDERS_TITLE}
            orders={recent.data ?? []}
            loading={recent.isLoading}
            emptyState={
              <EmptyState
                variant="inline"
                message={ORDERS_EMPTY.message}
                highlight={ORDERS_EMPTY.highlight}
                className="border-0"
              />
            }
          />
        </div>
      </section>
    </>
  );
};
