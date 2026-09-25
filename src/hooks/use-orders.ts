'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse } from '@/connections';
import type {
  OrderDetail,
  OrderStats,
  OrderSummary,
  OrdersListQuery,
} from '@/contracts/endpoints/orders';
import { queryKeys } from './query-keys';

/*
 * Buyer orders. `/orders*` does not exist on the backend yet, so every hook
 * forces its contract mock (same arrangement as `use-checkout-options.ts`).
 * Remove `useMock` here when the routes ship.
 */

/**
 * Applies the list filters on the client. The real API filters server-side
 * and this is then a no-op; while the mock returns everything it is what
 * makes the tabs, date range and search actually narrow the list.
 */
export const filterOrders = (orders: OrderSummary[], query: OrdersListQuery): OrderSummary[] => {
  const filtered = orders.filter((order) => {
    if (query.status && order.status !== query.status) return false;

    // Compare on the Gregorian day so `to` stays inclusive.
    const day = order.createdAt.slice(0, 10);

    if (query.from && day < query.from) return false;
    if (query.to && day > query.to) return false;
    if (query.q && !order.trackingCode.includes(query.q.trim())) return false;

    return true;
  });

  return query.limit ? filtered.slice(0, query.limit) : filtered;
};

/** Drops empty filters so equivalent queries share one cache entry and one URL. */
const toQueryParams = (query: OrdersListQuery) =>
  Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== undefined && value !== ''),
  ) as Record<string, string | number>;

export const useOrderStats = (): UseQueryResult<OrderStats, FailedApiResponse> =>
  useQuery<OrderStats, FailedApiResponse>({
    queryKey: queryKeys.orderStats(),
    queryFn: async () => {
      const response = await api('orders', 'getStats', { useMock: true });

      if (response.status !== 200) throw response;

      return response.data;
    },
  });

export const useOrders = (
  query: OrdersListQuery = {},
): UseQueryResult<OrderSummary[], FailedApiResponse> => {
  const params = toQueryParams(query);

  return useQuery<OrderSummary[], FailedApiResponse>({
    queryKey: queryKeys.ordersList(params),
    queryFn: async () => {
      const response = await api('orders', 'getList', { useMock: true, query: params });

      if (response.status !== 200) throw response;

      return filterOrders(response.data, query);
    },
  });
};

export const useOrder = (id: number | string): UseQueryResult<OrderDetail, FailedApiResponse> =>
  useQuery<OrderDetail, FailedApiResponse>({
    queryKey: queryKeys.orderDetail(id),
    queryFn: async () => {
      const response = await api('orders', 'getById', { useMock: true }, { pathParams: { id } });

      if (response.status !== 200) throw response;

      return response.data;
    },
  });
