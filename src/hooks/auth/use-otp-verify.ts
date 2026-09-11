'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/connections';
import type { OtpVerifyRequest, OtpVerifyResponse } from '@/contracts/endpoints/auth';
import { queryKeys } from '@/hooks/query-keys';
import type { AuthError } from './use-auth-me';

/** The only endpoint that returns `accessToken` — `POST /auth/otp/verify`. */
export const useOtpVerify = () =>
  useMutation<OtpVerifyResponse, AuthError, OtpVerifyRequest>({
    mutationKey: [...queryKeys.auth(), 'otp-verify'],
    mutationFn: async (body) => {
      const response = await api('auth', 'otpVerify', { body });

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
