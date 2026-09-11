'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/connections';
import type {
  BuyerSignUpRequest,
  OtpSentResponse,
  SellerSignUpRequest,
} from '@/contracts/endpoints/auth';
import { queryKeys } from '@/hooks/query-keys';
import type { AuthError } from './use-auth-me';

/** Seller/both signup rides `multipart/form-data` + the `document` file. */
export type SignUpMutationInput =
  BuyerSignUpRequest | (SellerSignUpRequest & { document?: File | null });

/** Start signup + send OTP — buyer: JSON; seller/both: `POST /auth/signup` multipart. */
export const useSignUp = () =>
  useMutation<OtpSentResponse, AuthError, SignUpMutationInput>({
    mutationKey: [...queryKeys.auth(), 'signup'],
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

      const response = await api('auth', 'signup', { body });

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
