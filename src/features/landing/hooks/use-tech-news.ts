'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse, type SuccessfulApiResponse } from '@/connections';
import { landingQueryKeys } from './query-keys';
import type { TechNewsItem } from '@/contracts/endpoints/posts/schemas';

export type TechNewsData = SuccessfulApiResponse<TechNewsItem[]>;
export type TechNewsError = FailedApiResponse;

export const useTechNews = (): UseQueryResult<TechNewsData['data'], TechNewsError> => {
  return useQuery<TechNewsData['data'], TechNewsError>({
    queryKey: landingQueryKeys.techNews(),
    queryFn: async () => {
      const response = await api('posts', 'getTechNews');

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
};
