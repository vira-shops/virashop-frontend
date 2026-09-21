'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse, type SuccessfulApiResponse } from '@/connections';
import { queryKeys } from './query-keys';
import type { BigOfferItem } from '@/contracts/endpoints/banners/schemas';

export type BigOffersData = SuccessfulApiResponse<BigOfferItem[]>;
export type BigOffersError = FailedApiResponse;

export const useBigOffers = (): UseQueryResult<BigOffersData['data'], BigOffersError> => {
  return useQuery<BigOffersData['data'], BigOffersError>({
    queryKey: queryKeys.bigOffers(),
    queryFn: async () => {
      // Not part of the real backend contract yet — always use the mock.
      const response = await api('banners', 'getBigOffers', { useMock: true });

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
};
