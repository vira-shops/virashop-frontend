'use client';

import * as React from 'react';
import { DateRangeModal, EmptyState, PageHeading, type DateRange } from '@/components/shared';
import { useOrders } from '@/hooks';
import { ORDERS_EMPTY, PAGE_TITLES } from '@/features/buyer-dashboard/constants';
import { OrdersTable } from '@/features/buyer-dashboard/components/orders-table';
import { DateRangeChip } from './date-range-chip';
import { OrdersSearch } from './orders-search';
import { OrdersToolbar } from './orders-toolbar';
import { useOrderFilters } from './use-order-filters';

/** «سفارش ها» — status tabs, tracking-code search and a date range, all kept in the URL. */
export const OrdersList: React.FC = () => {
  const { status, from, to, q, update } = useOrderFilters();
  const orders = useOrders({ status, from, to, q });

  const [dateOpen, setDateOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(Boolean(q));

  const applyRange = (range: DateRange) => {
    update({ from: range.from, to: range.to });
    setDateOpen(false);
  };

  return (
    <>
      <PageHeading title={PAGE_TITLES.orders} />

      <div className="flex flex-col gap-5">
        <OrdersToolbar
          status={status}
          onStatusChange={(value) => update({ status: value })}
          searchOpen={searchOpen}
          onToggleSearch={() => setSearchOpen((open) => !open)}
          onOpenDateRange={() => setDateOpen(true)}
        />

        {searchOpen && <OrdersSearch initialQuery={q} onSubmit={(query) => update({ q: query })} />}

        {(from || to) && (
          <DateRangeChip from={from} to={to} onClear={() => update({ from: null, to: null })} />
        )}

        <div className="rounded-8 border border-blue-100 bg-white p-5 md:p-7">
          <OrdersTable
            aria-label={PAGE_TITLES.orders}
            showProducts
            orders={orders.data ?? []}
            loading={orders.isLoading}
            emptyState={
              <EmptyState
                variant="inline"
                message={ORDERS_EMPTY.message}
                highlight={ORDERS_EMPTY.highlight}
                className="border-0 p-0"
              />
            }
          />
        </div>
      </div>

      <DateRangeModal
        open={dateOpen}
        onClose={() => setDateOpen(false)}
        onSubmit={applyRange}
        initialRange={{ from: from ?? null, to: to ?? null }}
        fieldsClassName="md:grid-cols-2"
      />
    </>
  );
};
