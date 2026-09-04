'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse, type SuccessfulApiResponse } from '@/connections';
import { landingQueryKeys } from './query-keys';
import type { StorefrontShowcaseResponse } from '@/contracts/endpoints/storefronts/schemas';

export type StorefrontShowcaseData = SuccessfulApiResponse<StorefrontShowcaseResponse>;
export type StorefrontShowcaseError = FailedApiResponse;

export const useStorefrontShowcase = (): UseQueryResult<
  StorefrontShowcaseResponse,
  StorefrontShowcaseError
> => {
  return useQuery<StorefrontShowcaseResponse, StorefrontShowcaseError>({
    queryKey: landingQueryKeys.showcase(),
    queryFn: async () => {
      const response = await api('storefronts', 'getShowcase');

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
};
