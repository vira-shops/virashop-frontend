'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/connections';
import type { SellerBoothResponse, SellerBoothUpdate } from '@/contracts/endpoints/auth';
import { queryKeys } from '@/hooks/query-keys';
import type { AuthError } from './use-auth-me';

/**
 * Completes the seller booth — `PATCH /auth/sellers/me`, requires the seller
 * JWT from verify. Fills the profile; the booth itself stays `PENDING`.
 */
export const useUpdateSellerBooth = () =>
  useMutation<SellerBoothResponse, AuthError, SellerBoothUpdate>({
    mutationKey: [...queryKeys.auth(), 'seller-booth'],
    mutationFn: async (body) => {
      const response = await api('auth', 'updateSellerBooth', { body });

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
