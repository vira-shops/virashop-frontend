'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse, type SuccessfulApiResponse } from '@/connections';
import type { PopularCategoriesResponse } from '@/contracts/endpoints/categories/schemas';
import { landingQueryKeys } from './query-keys';

export type PopularCategoriesData = SuccessfulApiResponse<PopularCategoriesResponse>;
export type PopularCategoriesError = FailedApiResponse;

export const usePopularCategories = (): UseQueryResult<
  PopularCategoriesData['data'],
  PopularCategoriesError
> =>
  useQuery<PopularCategoriesData['data'], PopularCategoriesError>({
    queryKey: landingQueryKeys.popularCategories(),
    queryFn: async () => {
      const response = await api('categories', 'getPopular');

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
