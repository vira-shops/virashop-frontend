'use client';

import * as React from 'react';
import { DateRangeModal, EmptyState, PageHeading, type DateRange } from '@/components/shared';
import { useOrders } from '@/hooks';
import { ORDERS_EMPTY, PAGE_TITLES, getBuyerChannel } from '@/features/buyer-dashboard/constants';
import type { BuyerChannelProps } from '@/features/buyer-dashboard/types';
import { OrdersTable } from '@/features/buyer-dashboard/components/orders-table';
import { DateRangeChip } from './date-range-chip';
import { OrderCards } from './order-cards';
import { OrdersSearch } from './orders-search';
import { OrdersToolbar } from './orders-toolbar';
import { useOrderFilters } from './use-order-filters';

/** «سفارش ها» — status tabs, tracking-code search and a date range, all kept in the URL. */
export const OrdersList: React.FC<BuyerChannelProps> = ({ channel }) => {
  const { theme } = getBuyerChannel(channel);
  const { status, from, to, q, update } = useOrderFilters();
  const orders = useOrders({ status, from, to, q });

  const [dateOpen, setDateOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(Boolean(q));

  const applyRange = (range: DateRange) => {
    update({ from: range.from, to: range.to });
    setDateOpen(false);
  };

  const submitSearch = (query: string | null) => update({ q: query });
  const rows = orders.data ?? [];

  const empty = (
    <EmptyState
      variant="inline"
      message={ORDERS_EMPTY.message}
      highlight={ORDERS_EMPTY.highlight}
      className="border-0 p-0"
    />
  );

  return (
    <>
      <PageHeading title={PAGE_TITLES.orders} />

      <div className="flex flex-col gap-5">
        {/* Phones keep the search field open, with the date picker inside it. */}
        <OrdersSearch
          initialQuery={q}
          onSubmit={submitSearch}
          onOpenDateRange={() => setDateOpen(true)}
          className="md:hidden"
        />

        <OrdersToolbar
          status={status}
          onStatusChange={(value) => update({ status: value })}
          searchOpen={searchOpen}
          onToggleSearch={() => setSearchOpen((open) => !open)}
          onOpenDateRange={() => setDateOpen(true)}
        />

        {searchOpen && (
          <OrdersSearch initialQuery={q} onSubmit={submitSearch} className="max-md:hidden" />
        )}

        {(from || to) && (
          <DateRangeChip from={from} to={to} onClear={() => update({ from: null, to: null })} />
        )}

        <div className="rounded-8 border border-blue-100 bg-white p-5 md:p-7">
          <div className="max-md:hidden">
            <OrdersTable
              channel={channel}
              variant="full"
              aria-label={PAGE_TITLES.orders}
              orders={rows}
              loading={orders.isLoading}
              emptyState={empty}
            />
          </div>
          <div className="md:hidden">
            {!orders.isLoading && rows.length === 0 ? (
              empty
            ) : (
              <OrderCards channel={channel} orders={rows} aria-label={PAGE_TITLES.orders} />
            )}
          </div>
        </div>
      </div>

      <DateRangeModal
        open={dateOpen}
        onClose={() => setDateOpen(false)}
        onSubmit={applyRange}
        initialRange={{ from: from ?? null, to: to ?? null }}
        fieldsClassName="md:grid-cols-2"
        theme={theme}
      />
    </>
  );
};
