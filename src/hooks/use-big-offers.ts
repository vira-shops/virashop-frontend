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
      const response = await api('banners', 'getBigOffers');

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
};
