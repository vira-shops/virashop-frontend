'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse, type SuccessfulApiResponse } from '@/connections';
import { queryKeys } from './query-keys';
import type { City } from '@/contracts/endpoints/cities/schemas';

export type CitiesData = SuccessfulApiResponse<City[]>;
export type CitiesError = FailedApiResponse;

export const useCities = (): UseQueryResult<CitiesData['data'], CitiesError> => {
  return useQuery<CitiesData['data'], CitiesError>({
    queryKey: queryKeys.citiesList(),
    queryFn: async () => {
      const response = await api('cities', 'getList');

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
};
