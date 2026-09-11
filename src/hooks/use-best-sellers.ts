'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse, type SuccessfulApiResponse } from '@/connections';
import { queryKeys } from './query-keys';
import type { BestSellersItem } from '@/contracts/endpoints/banners/schemas';

export type BestSellersData = SuccessfulApiResponse<BestSellersItem[]>;
export type BestSellersError = FailedApiResponse;

export const useBestSellers = (): UseQueryResult<BestSellersData['data'], BestSellersError> => {
  return useQuery<BestSellersData['data'], BestSellersError>({
    queryKey: queryKeys.bestSellers(),
    queryFn: async () => {
      const response = await api('banners', 'getBestSellers');

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
};
