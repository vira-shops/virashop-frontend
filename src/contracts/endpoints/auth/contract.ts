import { z } from 'zod';
import { Contracts, apiResponseWrapper } from '@/connections';
import { EmptyRequestSchema } from '@/contracts/common';
import {
  AuthMeResponseSchema,
  AuthSessionSchema,
  BuyerSignUpSchema,
  LogoutResponseSchema,
  OtpRequestSchema,
  OtpSentResponseSchema,
  OtpVerifyRequestSchema,
  OtpVerifyResponseSchema,
  SellerBoothUpdateSchema,
  SellerBoothResponseSchema,
  SellerSignUpSchema,
  SignupStep1RequestSchema,
} from './schemas';

/**
 * Auth contracts — mock-free by design: this feature must always talk to the
 * real API. With `NEXT_PUBLIC_API_BASE_URL` unset the fetcher throws instead
 * of silently falling back to mocks.
 */
export const authContracts = {
  auth: {
    /** Step 1 — name + phone, sends the OTP. No JWT yet. */
    signupStep1: {
      method: 'POST',
      path: '/auth/signup/step1',
      request: SignupStep1RequestSchema,
      response: apiResponseWrapper(OtpSentResponseSchema),
    },

    /**
     * Step 2 — role + profile, called only after OTP verify returned
     * `needsStep2: true`. Buyer: JSON — seller/both: multipart + `document`.
     * Returns the JWT — roles are assigned here.
     */
    signupStep2: {
      method: 'POST',
      path: '/auth/signup/step2',
      request: z.union([BuyerSignUpSchema, SellerSignUpSchema]),
      response: apiResponseWrapper(AuthSessionSchema),
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
