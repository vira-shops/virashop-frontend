'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse } from '@/connections';
import type {
  AddressesResponse,
  DeliveryOptionsResponse,
  PaymentMethodsResponse,
} from '@/contracts/endpoints/checkout';
import { queryKeys } from './query-keys';

/*
 * Checkout reference data. None of these routes exist on the backend yet
 * (`/addresses`, `/shipping/options` and `/payment-methods` all 404), so each
 * hook forces its contract mock — the same arrangement as
 * `use-best-sellers.ts`. Remove `useMock` here when the routes ship.
 */

export const useAddresses = (): UseQueryResult<AddressesResponse, FailedApiResponse> =>
  useQuery<AddressesResponse, FailedApiResponse>({
    queryKey: queryKeys.addresses(),
    queryFn: async () => {
      const response = await api('checkout', 'getAddresses', { useMock: true });

      if (response.status !== 200) throw response;

      return response.data;
    },
  });

export const useDeliveryOptions = (): UseQueryResult<DeliveryOptionsResponse, FailedApiResponse> =>
  useQuery<DeliveryOptionsResponse, FailedApiResponse>({
    queryKey: queryKeys.deliveryOptions(),
    queryFn: async () => {
      const response = await api('checkout', 'getDeliveryOptions', { useMock: true });

      if (response.status !== 200) throw response;

      return response.data;
    },
  });

export const usePaymentMethods = (): UseQueryResult<PaymentMethodsResponse, FailedApiResponse> =>
  useQuery<PaymentMethodsResponse, FailedApiResponse>({
    queryKey: queryKeys.paymentMethods(),
    queryFn: async () => {
      const response = await api('checkout', 'getPaymentMethods', { useMock: true });

      if (response.status !== 200) throw response;

      return response.data;
    },
  });
