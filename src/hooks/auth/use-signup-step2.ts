'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/connections';
import type {
  AuthSession,
  BuyerSignUpRequest,
  SellerSignUpRequest,
} from '@/contracts/endpoints/auth';
import { queryKeys } from '@/hooks/query-keys';
import type { AuthError } from './use-auth-me';

/** Seller/both step 2 rides `multipart/form-data` + the `document` file. */
export type SignupStep2MutationInput =
  BuyerSignUpRequest | (SellerSignUpRequest & { document?: File | null });

/**
 * Step 2 — role + profile, called only after OTP verify returned
 * `needsStep2: true` — `POST /auth/signup/step2`. Returns the JWT.
 */
export const useSignupStep2 = () =>
  useMutation<AuthSession, AuthError, SignupStep2MutationInput>({
    mutationKey: [...queryKeys.auth(), 'signup-step2'],
    mutationFn: async (input) => {
      let body: unknown;

      if (input.accountType === 'BUYER') {
        body = input;
      } else {
        const { document, ...payload } = input as SellerSignUpRequest & {
          document?: File | null;
        };
        const formData = new FormData();

        for (const [key, value] of Object.entries(payload)) {
          if (value !== undefined && value !== null && value !== '') {
            formData.append(key, String(value));
          }
        }

        if (document) {
          formData.append('document', document);
        }

        body = formData;
      }

      const response = await api('auth', 'signupStep2', { body });

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
