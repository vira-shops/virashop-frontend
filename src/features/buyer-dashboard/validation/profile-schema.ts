import { z } from 'zod';
import {
  BuyTypeSchema,
  GenderSchema,
  type Profile,
  type ProfileUpdateRequest,
} from '@/contracts/endpoints/profile';

/** Flat form shape — both profile cards live in one form so one «ذخیره» saves both. */
export const ProfileFormSchema = z.object({
  fullName: z.string().trim().min(3, 'نام و نام خانوادگی را کامل وارد کنید'),
  /** Read-only — the login identity; changed through OTP, not this form. */
  mobile: z.string(),
  nationalId: z.string().regex(/^\d{10}$/, 'کد ملی باید ۱۰ رقم باشد'),
  birthDate: z.string().nullable(),
  gender: z.union([GenderSchema, z.literal('')]),
  businessName: z.string().trim().min(2, 'نام کسب‌وکار را وارد کنید'),
  businessPhone: z.string().regex(/^0\d{10}$/, 'تلفن ثابت باید ۱۱ رقم و با ۰ شروع شود'),
  province: z.string().min(1, 'استان را انتخاب کنید'),
  city: z.string().min(1, 'شهر را انتخاب کنید'),
  postalCode: z.string().regex(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد'),
  buyType: BuyTypeSchema,
  address: z.string().trim().min(10, 'آدرس را کامل وارد کنید'),
});
export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

export const toProfileFormValues = ({ personal, business }: Profile): ProfileFormValues => ({
  fullName: personal.fullName,
  mobile: personal.mobile,
  nationalId: personal.nationalId,
  birthDate: personal.birthDate,
  gender: personal.gender ?? '',
  businessName: business.name,
  businessPhone: business.phone,
  province: business.province,
  city: business.city,
  postalCode: business.postalCode,
  buyType: business.buyType,
  address: business.address,
});

export const toProfileUpdateRequest = (values: ProfileFormValues): ProfileUpdateRequest => ({
  personal: {
    fullName: values.fullName.trim(),
    nationalId: values.nationalId,
    birthDate: values.birthDate,
    gender: values.gender || null,
  },
  business: {
    name: values.businessName.trim(),
    phone: values.businessPhone,
    province: values.province,
    city: values.city,
    postalCode: values.postalCode,
    buyType: values.buyType,
    address: values.address.trim(),
  },
});
