'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/connections';
import type { OtpRequest, OtpSentResponse } from '@/contracts/endpoints/auth';
import { queryKeys } from '@/hooks/query-keys';
import type { AuthError } from './use-auth-me';

/** Login OTP or signup resend — `POST /auth/otp/request`. */
export const useOtpRequest = () =>
  useMutation<OtpSentResponse, AuthError, OtpRequest>({
    mutationKey: [...queryKeys.auth(), 'otp-request'],
    mutationFn: async (body) => {
      const response = await api('auth', 'otpRequest', { body });

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
