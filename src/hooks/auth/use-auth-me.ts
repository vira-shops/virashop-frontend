'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse, type SuccessfulApiResponse } from '@/connections';
import type { AuthUser } from '@/contracts/endpoints/auth';
import { queryKeys } from '@/hooks/query-keys';

export type AuthMeData = SuccessfulApiResponse<AuthUser>['data'];
export type AuthError = FailedApiResponse;

/** Current session — only meaningful while an access token exists. */
export const useAuthMe = (options?: { enabled?: boolean }): UseQueryResult<AuthMeData, AuthError> =>
  useQuery<AuthMeData, AuthError>({
    queryKey: queryKeys.authMe(),
    enabled: options?.enabled,
    retry: false,
    queryFn: async () => {
      const response = await api('auth', 'me');

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
