import type { AuthErrorCode, SalesType } from '@/contracts/endpoints/auth';
import type { AccountType, AuthSelectOption } from './types';

/* =========================================================
   Auth timing rules (mirrors the API contract)
   ========================================================= */

export const OTP_LENGTH = 6;

/** OTP time-to-live — `120` seconds per the API doc. */
export const OTP_TTL_SECONDS = 120;

/** Resend cooldown — `60` seconds (`OTP_RATE_LIMITED` / 429) per the API doc. */
export const OTP_RESEND_COOLDOWN_SECONDS = 60;

/** Backend signup draft lives ~120s; the persisted wizard draft expires sooner. */
export const AUTH_FLOW_MAX_AGE_MS = 10 * 60 * 1000;

/* =========================================================
   Document upload rules (mirrors the API contract)
   ========================================================= */

export const DOCUMENT_MAX_SIZE_MB = 5;

export const DOCUMENT_ACCEPTED_MIME: readonly string[] = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
];

export const DOCUMENT_ACCEPT = DOCUMENT_ACCEPTED_MIME.join(',');

/* =========================================================
   Persian error messages — branched on `errorCode`, never on
   the (possibly English) backend `message`
   ========================================================= */

export const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, string> = {
  VALIDATION: 'اطلاعات ارسالی معتبر نیست',
  INVALID_PHONE: 'شماره موبایل نامعتبر است',
  SELLER_PROFILE_INCOMPLETE: 'اطلاعات غرفه تکمیل نشده است',
  UNAUTHORIZED: 'نشست شما منقضی شده است؛ دوباره وارد شوید',
  INVALID_OTP: 'کد تایید نادرست است',
  OTP_EXPIRED: 'کد تایید منقضی شده است؛ کد جدید دریافت کنید',
  FORBIDDEN: 'دسترسی لازم را ندارید',
  ACCOUNT_INACTIVE: 'حساب شما غیرفعال است؛ با پشتیبانی تماس بگیرید',
  ACCOUNT_NOT_FOUND: 'حسابی با این شماره پیدا نشد',
  PHONE_ALREADY_REGISTERED: 'این شماره قبلاً ثبت‌نام کرده است؛ وارد شوید',
  SELLER_ALREADY_EXISTS: 'این شماره قبلاً به‌عنوان فروشنده ثبت شده است',
  SELLER_NOT_FOUND: 'غرفه‌ای برای این حساب پیدا نشد',
  OTP_RATE_LIMITED: 'تعداد درخواست‌ها زیاد است؛ کمی بعد تلاش کنید',
  INTERNAL: 'خطای غیرمنتظره؛ دوباره تلاش کنید',
};

/* =========================================================
   Select catalogs — placeholder values per the API doc examples
   (GROCERY / FOOD / SNACKS, …); will come from an API later
   ========================================================= */

export const ACCOUNT_TYPE_OPTIONS: AuthSelectOption<AccountType>[] = [
  { value: 'BUYER', label: 'خریدار' },
  { value: 'SELLER', label: 'فروشنده' },
  { value: 'BOTH', label: 'هر دو' },
];

export const ACTIVITY_TYPE_OPTIONS: AuthSelectOption[] = [
  { value: 'GROCERY', label: 'خواربار و سوپرمارکت' },
  { value: 'STORE', label: 'مغازه و فروشگاه' },
  { value: 'ONLINE', label: 'فروش آنلاین' },
  { value: 'OTHER', label: 'سایر' },
];

export const GUILD_TYPE_OPTIONS: AuthSelectOption[] = [
  { value: 'FOOD', label: 'مواد غذایی' },
  { value: 'CLOTHING', label: 'پوشاک' },
  { value: 'DIGITAL', label: 'کالای دیجیتال' },
  { value: 'OTHER', label: 'سایر' },
];

export const INDUSTRY_TYPE_OPTIONS: AuthSelectOption[] = [
  { value: 'FOOD', label: 'صنایع غذایی' },
  { value: 'TEXTILE', label: 'نساجی و پوشاک' },
  { value: 'ELECTRONICS', label: 'الکترونیک' },
  { value: 'OTHER', label: 'سایر' },
];

export const CATEGORY_OPTIONS: AuthSelectOption[] = [
  { value: 'SNACKS', label: 'تنقلات' },
  { value: 'DAIRY', label: 'لبنیات' },
  { value: 'BEVERAGES', label: 'نوشیدنی‌ها' },
  { value: 'OTHER', label: 'سایر' },
];

export const SALES_TYPE_OPTIONS: AuthSelectOption<SalesType>[] = [
  { value: 'SUPERMARKET', label: 'سوپرمارکت' },
  { value: 'STORE', label: 'فروشگاه' },
];

/** Provinces for the booth form — static until a region endpoint exists. */
export const PROVINCE_OPTIONS: AuthSelectOption[] = [
  'تهران',
  'البرز',
  'قم',
  'قزوین',
  'مازندران',
  'گیلان',
  'اردبیل',
  'آذربایجان شرقی',
  'آذربایجان غربی',
  'کردستان',
  'کرمانشاه',
  'همدان',
  'زنجان',
  'لرستان',
  'ایلام',
  'خوزستان',
  'کهگیلویه و بویراحمد',
  'فارس',
  'بوشهر',
  'هرمزگان',
  'کرمان',
  'یزد',
  'اصفهان',
  'چهارمحال و بختیاری',
  'مرکزی',
  'سمنان',
  'گلستان',
  'خراسان شمالی',
  'خراسان رضوی',
  'خراسان جنوبی',
  'سیستان و بلوچستان',
].map((province) => ({ value: province, label: province }));

/* =========================================================
   Wizard copy
   ========================================================= */

export const AUTH_WIZARD_STEPS = {
  credentials: 'اطلاعات حساب',
  otp: 'کد تایید',
  role: 'نقش خود را انتخاب کنید',
  success: 'ثبت‌نام موفق',
  booth: 'تکمیل اطلاعات غرفه',
} as const;
