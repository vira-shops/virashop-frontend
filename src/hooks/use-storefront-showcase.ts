'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse, type SuccessfulApiResponse } from '@/connections';
import { queryKeys } from './query-keys';
import type { StorefrontShowcaseResponse } from '@/contracts/endpoints/storefronts/schemas';

export type StorefrontShowcaseData = SuccessfulApiResponse<StorefrontShowcaseResponse>;
export type StorefrontShowcaseError = FailedApiResponse;

export const useStorefrontShowcase = (): UseQueryResult<
  StorefrontShowcaseResponse,
  StorefrontShowcaseError
> => {
  return useQuery<StorefrontShowcaseResponse, StorefrontShowcaseError>({
    queryKey: queryKeys.showcase(),
    queryFn: async () => {
      // Not part of the real backend contract yet — always use the mock.
      const response = await api('storefronts', 'getShowcase', { useMock: true });

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
};
