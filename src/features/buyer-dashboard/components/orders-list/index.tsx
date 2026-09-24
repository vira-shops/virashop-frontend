'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CalendarIcon, CancelIcon, SearchIcon } from '@icons';
import { Badge, Button, Tabs, TextInput, formatIsoAsJalali } from '@/components/ui';
import { DateRangeModal, EmptyState, PageHeading, type DateRange } from '@/components/shared';
import { OrderStatusSchema, type OrderStatus } from '@/contracts/endpoints/orders';
import { useOrderStats, useOrders } from '@/hooks';
import { cn } from '@/utils/ui';
import { toFaDigits } from '@/utils/format';
import {
  DEFAULT_ORDER_TAB,
  ORDERS_EMPTY,
  ORDERS_TOOLBAR,
  ORDER_TABS,
  PAGE_TITLES,
} from '@/features/buyer-dashboard/constants';
import { OrdersTable } from '@/features/buyer-dashboard/components/orders-table';

type FilterKey = 'status' | 'from' | 'to' | 'q';

/** Reads/writes the list filters in the URL so they survive refresh and sharing. */
const useOrderFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const parsedStatus = OrderStatusSchema.safeParse(searchParams.get('status'));
  const status: OrderStatus = parsedStatus.success ? parsedStatus.data : DEFAULT_ORDER_TAB;
  const from = searchParams.get('from') ?? undefined;
  const to = searchParams.get('to') ?? undefined;
  const q = searchParams.get('q') ?? undefined;

  const update = React.useCallback(
    (patch: Partial<Record<FilterKey, string | null>>) => {
      const next = new URLSearchParams(searchParams.toString());

      Object.entries(patch).forEach(([key, value]) => {
        if (value) next.set(key, value);
        else next.delete(key);
      });

      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return { status, from, to, q, update };
};

export const OrdersList: React.FC = () => {
  const { status, from, to, q, update } = useOrderFilters();
  const stats = useOrderStats();
  const orders = useOrders({ status, from, to, q });

  const [dateOpen, setDateOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(Boolean(q));
  const [searchDraft, setSearchDraft] = React.useState(q ?? '');

  const tabs = ORDER_TABS.map((tab) => {
    const count = stats.data?.[tab.value];

    return {
      value: tab.value,
      label: (
        <span className="flex items-center gap-2">
          {tab.label}
          {count !== undefined && (
            <Badge
              color="gray"
              size="xs"
              radius="sm"
              className={cn('px-2', tab.value === status && 'bg-blue-900 text-white')}
            >
              {toFaDigits(count)}
            </Badge>
          )}
        </span>
      ),
    };
  });

  const applyRange = (range: DateRange) => {
    update({ from: range.from, to: range.to });
    setDateOpen(false);
  };

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    update({ q: searchDraft.trim() || null });
  };

  const hasRange = Boolean(from || to);

  return (
    <>
      <PageHeading title={PAGE_TITLES.orders} />

      <div className="flex flex-col gap-5">
        <div className="flex items-end justify-between gap-5 border-b border-blue-100">
          <div className="no-scrollbar min-w-0 overflow-x-auto">
            <Tabs
              aria-label={PAGE_TITLES.orders}
              variant="underline"
              items={tabs}
              value={status}
              onChange={(value) => update({ status: value })}
              itemClassName="pb-4"
            />
          </div>
          <div className="flex shrink-0 items-center gap-1 pb-2">
            <Button
              variant="ghost"
              size="sm"
              aria-label={ORDERS_TOOLBAR.searchLabel}
              aria-pressed={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
              icon={<SearchIcon className="size-9 text-blue-300" />}
            />
            <Button
              variant="ghost"
              size="sm"
              aria-label={ORDERS_TOOLBAR.dateLabel}
              onClick={() => setDateOpen(true)}
              icon={<CalendarIcon className="size-9 text-blue-300" />}
            />
          </div>
        </div>

        {searchOpen && (
          <form role="search" onSubmit={submitSearch}>
            <TextInput
              aria-label={ORDERS_TOOLBAR.searchLabel}
              placeholder={ORDERS_TOOLBAR.searchPlaceholder}
              inputMode="numeric"
              variant="fill"
              fullWidth
              value={searchDraft}
              onChange={(event) => setSearchDraft(event.target.value)}
              rightIcon={<SearchIcon aria-hidden="true" />}
            />
          </form>
        )}

        {hasRange && (
          <div className="flex items-center gap-3">
            <Badge
              variant="soft"
              color="primary"
              size="md"
              leftIcon={
                <button
                  type="button"
                  aria-label={ORDERS_TOOLBAR.clearFilters}
                  onClick={() => update({ from: null, to: null })}
                  className="flex"
                >
                  <CancelIcon className="size-7" aria-hidden="true" />
                </button>
              }
            >
              {[
                ORDERS_TOOLBAR.rangePrefix,
                from && `${ORDERS_TOOLBAR.rangeFrom} ${formatIsoAsJalali(from)}`,
                to && `${ORDERS_TOOLBAR.rangeTo} ${formatIsoAsJalali(to)}`,
              ]
                .filter(Boolean)
                .join(' ')}
            </Badge>
          </div>
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
