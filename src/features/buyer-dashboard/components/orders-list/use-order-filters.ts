'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { OrderStatusSchema, type OrderStatus } from '@/contracts/endpoints/orders';
import { DEFAULT_ORDER_TAB } from './constants';
import type { OrderFilterPatch } from './types';

/** Reads/writes the list filters in the URL so they survive refresh and sharing. */
export const useOrderFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const parsedStatus = OrderStatusSchema.safeParse(searchParams.get('status'));
  const status: OrderStatus = parsedStatus.success ? parsedStatus.data : DEFAULT_ORDER_TAB;
  const from = searchParams.get('from') ?? undefined;
  const to = searchParams.get('to') ?? undefined;
  const q = searchParams.get('q') ?? undefined;

  const update = React.useCallback(
    (patch: OrderFilterPatch) => {
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
