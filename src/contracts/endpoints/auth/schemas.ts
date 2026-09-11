import { z } from 'zod';
import { MobileSchema } from '@/validations';

/* =========================================================
   Auth — enums (single source of truth for the wire)
   ========================================================= */

export const ChannelSchema = z.enum(['RETAIL', 'WHOLESALE']);
export type Channel = z.infer<typeof ChannelSchema>;

export const AccountTypeSchema = z.enum(['BUYER', 'SELLER', 'BOTH']);
export type AccountType = z.infer<typeof AccountTypeSchema>;

export const DocumentTypeSchema = z.enum(['NATIONAL_ID', 'BUSINESS_LICENSE']);
export type DocumentType = z.infer<typeof DocumentTypeSchema>;

export const AccountStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']);
export type AccountStatus = z.infer<typeof AccountStatusSchema>;

export const SellerKindSchema = z.enum(['RETAIL', 'WHOLESALE', 'BOTH']);
export type SellerKind = z.infer<typeof SellerKindSchema>;

export const SellerStatusSchema = z.enum(['PENDING', 'ACTIVE', 'SUSPENDED', 'INACTIVE']);
export type SellerStatus = z.infer<typeof SellerStatusSchema>;

export const SalesTypeSchema = z.enum(['SUPERMARKET', 'STORE']);
export type SalesType = z.infer<typeof SalesTypeSchema>;

/* =========================================================
   Auth — user
   ========================================================= */

export const SellerSummarySchema = z.object({
  id: z.number(),
  kind: SellerKindSchema,
  status: SellerStatusSchema,
  shopName: z.string().nullable(),
  profileComplete: z.boolean(),
});
export type SellerSummary = z.infer<typeof SellerSummarySchema>;

export const AuthUserSchema = z.object({
  id: z.number(),
  phone: z.string(), // 09xxxxxxxxx
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  roles: z.array(z.string()),
  accountStatus: AccountStatusSchema,
  phoneVerified: z.boolean(),
  activityType: z.string().nullable(),
  guildType: z.string().nullable(),
  seller: SellerSummarySchema.nullable(), // buyers: null
});
export type AuthUser = z.infer<typeof AuthUserSchema>;

/* =========================================================
   Auth — requests
   ========================================================= */

const SignUpBaseSchema = z.object({
  firstName: z.string().min(2).max(80),
  lastName: z.string().min(2).max(80),
  phone: MobileSchema,
  channel: ChannelSchema,
  activityType: z.string().min(1),
});

export const BuyerSignUpSchema = SignUpBaseSchema.extend({
  accountType: z.literal('BUYER'),
  guildType: z.string().min(1),
});
export type BuyerSignUpRequest = z.infer<typeof BuyerSignUpSchema>;

export const SellerSignUpSchema = SignUpBaseSchema.extend({
  accountType: z.enum(['SELLER', 'BOTH']),
  industryType: z.string().min(1),
  category: z.string().min(1),
  documentType: DocumentTypeSchema.optional(),
});
export type SellerSignUpRequest = z.infer<typeof SellerSignUpSchema>;

/** Buyer signup rides JSON; seller/both rides `multipart/form-data` + `document` file. */
export const SignUpRequestSchema = z.union([BuyerSignUpSchema, SellerSignUpSchema]);
export type SignUpRequest = z.infer<typeof SignUpRequestSchema>;

export const OtpRequestSchema = z.object({
  phone: MobileSchema,
});
export type OtpRequest = z.infer<typeof OtpRequestSchema>;

export const OtpVerifyRequestSchema = z.object({
  phone: MobileSchema,
  /** Exactly 6 digits. */
  code: z.string().regex(/^\d{6}$/, 'کد تایید باید ۶ رقم باشد'),
});
export type OtpVerifyRequest = z.infer<typeof OtpVerifyRequestSchema>;

/* =========================================================
   Auth — responses
   ========================================================= */

export const OtpSentResponseSchema = z.object({
  otpSent: z.literal(true),
});
export type OtpSentResponse = z.infer<typeof OtpSentResponseSchema>;

export const OtpVerifyResponseSchema = z.object({
  accessToken: z.string(),
  user: AuthUserSchema,
});
export type OtpVerifyResponse = z.infer<typeof OtpVerifyResponseSchema>;

export const AuthMeResponseSchema = AuthUserSchema;

/** `PATCH /auth/sellers/me` — complete the booth (seller JWT required). */
export const SellerBoothUpdateSchema = z.object({
  shopName: z.string().min(1).max(160),
  workplacePhone: z.string().optional(),
  province: z.string().min(1),
  city: z.string().min(1),
  /** Exactly 10 digits when provided. */
  postalCode: z
    .string()
    .regex(/^\d{10}$/)
    .optional(),
  salesType: SalesTypeSchema,
  address: z.string().min(1),
});
export type SellerBoothUpdate = z.infer<typeof SellerBoothUpdateSchema>;

/** Booth completion does NOT activate the booth — status stays `PENDING`. */
export const SellerBoothResponseSchema = SellerSummarySchema;
export type SellerBoothResponse = z.infer<typeof SellerBoothResponseSchema>;

export const LogoutResponseSchema = z.object({
  loggedOut: z.literal(true),
});
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;

/* =========================================================
   Auth — errorCode union (branch on these, never on message)
   ========================================================= */

export const AuthErrorCode = [
  'VALIDATION',
  'INVALID_PHONE',
  'SELLER_PROFILE_INCOMPLETE',
  'UNAUTHORIZED',
  'INVALID_OTP',
  'OTP_EXPIRED',
  'FORBIDDEN',
  'ACCOUNT_INACTIVE',
  'ACCOUNT_NOT_FOUND',
  'PHONE_ALREADY_REGISTERED',
  'SELLER_ALREADY_EXISTS',
  'SELLER_NOT_FOUND',
  'OTP_RATE_LIMITED',
  'INTERNAL',
] as const;

export type AuthErrorCode = (typeof AuthErrorCode)[number];
