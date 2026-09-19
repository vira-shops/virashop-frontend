'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/connections';
import type { OtpSentResponse, SignupStep1Request } from '@/contracts/endpoints/auth';
import { queryKeys } from '@/hooks/query-keys';
import type { AuthError } from './use-auth-me';

/** Step 1 — name + phone, sends the OTP — `POST /auth/signup/step1`. */
export const useSignupStep1 = () =>
  useMutation<OtpSentResponse, AuthError, SignupStep1Request>({
    mutationKey: [...queryKeys.auth(), 'signup-step1'],
    mutationFn: async (body) => {
      const response = await api('auth', 'signupStep1', { body });

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
