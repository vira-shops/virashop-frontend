'use client';

import * as React from 'react';
import { CalendarIcon, SearchIcon } from '@icons';
import { Badge, Button, Tabs } from '@/components/ui';
import { useOrderStats } from '@/hooks';
import { cn } from '@/utils/ui';
import { toFaDigits } from '@/utils/format';
import { PAGE_TITLES } from '@/features/buyer-dashboard/constants';
import { ACTIVE_TAB_COUNT_CLASS, ORDER_TABS, ORDERS_TOOLBAR } from './constants';
import type { OrdersToolbarProps } from './types';

/** Status tabs (with counts) on the start side, search + date buttons on the end side. */
export const OrdersToolbar: React.FC<OrdersToolbarProps> = ({
  status,
  onStatusChange,
  searchOpen,
  onToggleSearch,
  onOpenDateRange,
}) => {
  const stats = useOrderStats();

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
              className={cn('px-2', tab.value === status && ACTIVE_TAB_COUNT_CLASS)}
            >
              {toFaDigits(count)}
            </Badge>
          )}
        </span>
      ),
    };
  });

  return (
    <div className="flex items-end justify-between gap-5 border-b border-blue-100">
      <div className="no-scrollbar min-w-0 overflow-x-auto">
        <Tabs
          aria-label={PAGE_TITLES.orders}
          variant="underline"
          items={tabs}
          value={status}
          onChange={onStatusChange}
          itemClassName="pb-4"
        />
      </div>
      <div className="flex shrink-0 items-center gap-1 pb-2">
        <Button
          variant="ghost"
          aria-label={ORDERS_TOOLBAR.searchLabel}
          aria-pressed={searchOpen}
          onClick={onToggleSearch}
          icon={<SearchIcon className="size-12" />}
          className="hover:bg-transparent"
        />
        <Button
          variant="ghost"
          aria-label={ORDERS_TOOLBAR.dateLabel}
          onClick={onOpenDateRange}
          icon={<CalendarIcon className="size-12" />}
          className="hover:bg-transparent"
        />
      </div>
    </div>
  );
};
