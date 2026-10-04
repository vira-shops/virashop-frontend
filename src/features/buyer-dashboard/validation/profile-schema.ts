import { z } from 'zod';
import { GeoPointSchema } from '@/contracts/endpoints/addresses/schemas';
import {
  BuyTypeSchema,
  GenderSchema,
  type Profile,
  type ProfileUpdateRequest,
} from '@/contracts/endpoints/profile';
import type { BuyerProfileVariant } from '@/features/buyer-dashboard/types';

const ADDRESS_MESSAGE = 'آدرس را کامل وارد کنید';

/**
 * Flat form shape — both profile cards live in one form so one «ذخیره» saves
 * both. `address` is the business address on the wholesale dashboard and the
 * home address («اطلاعات تکمیلی») on the retail one.
 */
export const ProfileFormSchema = z.object({
  fullName: z.string().trim().min(3, 'نام و نام خانوادگی را کامل وارد کنید'),
  /** Read-only — the login identity; changed through OTP, not this form. */
  mobile: z.string(),
  nationalId: z.string().regex(/^\d{10}$/, 'کد ملی باید ۱۰ رقم باشد'),
  birthDate: z.string().nullable(),
  gender: z.union([GenderSchema, z.literal('')]),
  email: z.union([z.literal(''), z.string().trim().email('ایمیل معتبر نیست')]),
  occupation: z.string().trim(),
  businessName: z.string().trim().min(2, 'نام کسب‌وکار را وارد کنید'),
  businessPhone: z.string().regex(/^0\d{10}$/, 'تلفن ثابت باید ۱۱ رقم و با ۰ شروع شود'),
  province: z.string().min(1, 'استان را انتخاب کنید'),
  city: z.string().min(1, 'شهر را انتخاب کنید'),
  postalCode: z.string().regex(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد'),
  buyType: BuyTypeSchema,
  address: z.string().trim().min(10, ADDRESS_MESSAGE),
  /** «انتخاب روی نقشه» — retail only. */
  location: GeoPointSchema.nullable(),
});
export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

/**
 * Retail: the business fields are not shown, so they are not validated
 * either; the birth date is required here (per the design's «*»).
 */
const AddressProfileFormSchema = ProfileFormSchema.extend({
  birthDate: z
    .string()
    .nullable()
    .refine((value) => Boolean(value), 'تاریخ تولد را انتخاب کنید'),
  businessName: z.string(),
  businessPhone: z.string(),
  province: z.string(),
  city: z.string(),
  postalCode: z.string(),
});

export const PROFILE_FORM_SCHEMAS: Record<BuyerProfileVariant, z.ZodType<ProfileFormValues>> = {
  business: ProfileFormSchema,
  address: AddressProfileFormSchema,
};

export const toProfileFormValues = (
  { personal, business, address }: Profile,
  variant: BuyerProfileVariant,
): ProfileFormValues => ({
  fullName: personal.fullName,
  mobile: personal.mobile,
  nationalId: personal.nationalId,
  birthDate: personal.birthDate,
  gender: personal.gender ?? '',
  email: personal.email ?? '',
  occupation: personal.occupation ?? '',
  businessName: business?.name ?? '',
  businessPhone: business?.phone ?? '',
  province: business?.province ?? '',
  city: business?.city ?? '',
  postalCode: business?.postalCode ?? '',
  buyType: business?.buyType ?? 'SHOP',
  address: (variant === 'business' ? business?.address : address?.line) ?? '',
  location: address?.location ?? null,
});

export const toProfileUpdateRequest = (
  values: ProfileFormValues,
  variant: BuyerProfileVariant,
): ProfileUpdateRequest => {
  const personal = {
    fullName: values.fullName.trim(),
    nationalId: values.nationalId,
    birthDate: values.birthDate,
    gender: values.gender || null,
    email: values.email.trim() || null,
    occupation: values.occupation.trim() || null,
  };

  if (variant === 'address') {
    return { personal, address: { line: values.address.trim(), location: values.location } };
  }

  return {
    personal,
    business: {
      name: values.businessName.trim(),
      phone: values.businessPhone,
      province: values.province,
      city: values.city,
      postalCode: values.postalCode,
      buyType: values.buyType,
      address: values.address.trim(),
    },
  };
};
