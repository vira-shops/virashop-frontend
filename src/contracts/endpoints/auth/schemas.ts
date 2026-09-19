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

/** `POST /auth/signup/step1` — name + phone, sends the OTP. No JWT yet. */
export const SignupStep1RequestSchema = z.object({
  firstName: z.string().min(2).max(80),
  lastName: z.string().min(2).max(80),
  phone: MobileSchema,
});
export type SignupStep1Request = z.infer<typeof SignupStep1RequestSchema>;

/**
 * `POST /auth/signup/step2` — role + profile, called only after OTP verify
 * returned `needsStep2: true`. Do NOT send `firstName`/`lastName` (already
 * captured by step 1; extra fields fail `forbidNonWhitelisted`).
 */
const SignupStep2BaseSchema = z.object({
  phone: MobileSchema,
  channel: ChannelSchema,
  activityType: z.string().min(1),
});

export const BuyerSignUpSchema = SignupStep2BaseSchema.extend({
  accountType: z.literal('BUYER'),
  guildType: z.string().min(1),
});
export type BuyerSignUpRequest = z.infer<typeof BuyerSignUpSchema>;

export const SellerSignUpSchema = SignupStep2BaseSchema.extend({
  accountType: z.enum(['SELLER', 'BOTH']),
  industryType: z.string().min(1),
  category: z.string().min(1),
  documentType: DocumentTypeSchema.optional(),
});
export type SellerSignUpRequest = z.infer<typeof SellerSignUpSchema>;

/** Buyer step 2 rides JSON; seller/both rides `multipart/form-data` + `document` file. */
export const SignupStep2RequestSchema = z.union([BuyerSignUpSchema, SellerSignUpSchema]);
export type SignupStep2Request = z.infer<typeof SignupStep2RequestSchema>;

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

/** Login, legacy signup verify, and `signup/step2` all return this shape. */
export const AuthSessionSchema = z.object({
  accessToken: z.string(),
  user: AuthUserSchema,
});
export type AuthSession = z.infer<typeof AuthSessionSchema>;

/** Signup only — after OTP verify, before step 2. No JWT yet. */
export const NeedsStep2Schema = z.object({
  needsStep2: z.literal(true),
  phone: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});
export type NeedsStep2 = z.infer<typeof NeedsStep2Schema>;

/**
 * `POST /auth/otp/verify` — login / legacy signup resolve to `AuthSession`;
 * a fresh `signup/step1` draft resolves to `NeedsStep2` instead (no token
 * until step 2 completes). Discriminate with `isNeedsStep2`.
 */
export const OtpVerifyResponseSchema = z.union([AuthSessionSchema, NeedsStep2Schema]);
export type OtpVerifyResponse = z.infer<typeof OtpVerifyResponseSchema>;

export const isNeedsStep2 = (data: OtpVerifyResponse): data is NeedsStep2 =>
  'needsStep2' in data && data.needsStep2 === true;

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
