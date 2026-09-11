'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/connections';
import type { LogoutResponse } from '@/contracts/endpoints/auth';
import { queryKeys } from '@/hooks/query-keys';
import type { AuthError } from './use-auth-me';

/** Denylists the sent token — `POST /auth/logout`; drop it on the client after. */
export const useLogout = () =>
  useMutation<LogoutResponse, AuthError, void>({
    mutationKey: [...queryKeys.auth(), 'logout'],
    mutationFn: async () => {
      const response = await api('auth', 'logout');

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
