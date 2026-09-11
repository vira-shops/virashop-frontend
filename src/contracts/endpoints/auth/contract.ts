import { z } from 'zod';
import { Contracts, apiResponseWrapper } from '@/connections';
import { EmptyRequestSchema } from '@/contracts/common';
import {
  AuthMeResponseSchema,
  BuyerSignUpSchema,
  LogoutResponseSchema,
  OtpRequestSchema,
  OtpSentResponseSchema,
  OtpVerifyRequestSchema,
  OtpVerifyResponseSchema,
  SellerBoothUpdateSchema,
  SellerBoothResponseSchema,
  SellerSignUpSchema,
} from './schemas';

/**
 * Auth contracts — mock-free by design: this feature must always talk to the
 * real API. With `NEXT_PUBLIC_API_BASE_URL` unset the fetcher throws instead
 * of silently falling back to mocks.
 */
export const authContracts = {
  auth: {
    /** Start signup + send OTP. Buyer: JSON — seller/both: multipart + `document` file. */
    signup: {
      method: 'POST',
      path: '/auth/signup',
      request: z.union([BuyerSignUpSchema, SellerSignUpSchema]),
      response: apiResponseWrapper(OtpSentResponseSchema),
    },

    /** Login OTP or signup resend. */
    otpRequest: {
      method: 'POST',
      path: '/auth/otp/request',
      request: OtpRequestSchema,
      response: apiResponseWrapper(OtpSentResponseSchema),
    },

    /** The only endpoint that returns `accessToken`. */
    otpVerify: {
      method: 'POST',
      path: '/auth/otp/verify',
      request: OtpVerifyRequestSchema,
      response: apiResponseWrapper(OtpVerifyResponseSchema),
    },

    /** Current session — requires `Authorization: Bearer`. */
    me: {
      method: 'GET',
      path: '/auth/me',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(AuthMeResponseSchema),
      auth: true,
    },

    /**
     * Complete the seller booth (seller JWT). Fills the shop profile and
     * flips `profileComplete: true` — the booth itself stays `PENDING`
     * until an admin activates it.
     */
    updateSellerBooth: {
      method: 'PATCH',
      path: '/auth/sellers/me',
      request: SellerBoothUpdateSchema,
      response: apiResponseWrapper(SellerBoothResponseSchema),
      auth: true,
    },

    /** Denylists the sent token; drop it on the client afterwards. */
    logout: {
      method: 'POST',
      path: '/auth/logout',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(LogoutResponseSchema),
      auth: true,
    },
  },
} as const satisfies Contracts;
