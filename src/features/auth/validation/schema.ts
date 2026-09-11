import { z } from 'zod';
import { AccountTypeSchema, DocumentTypeSchema } from '@/contracts/endpoints/auth';
import { MobileSchema } from '@/validations';
import { DOCUMENT_ACCEPTED_MIME, DOCUMENT_MAX_SIZE_MB } from '@/features/auth/constants';

/* =========================================================
   Auth forms — zod schemas (feature-local; primitives reuse
   `@/validations` so contract and form rules never drift)
   ========================================================= */

export const CredentialsSchema = z.object({
  firstName: z.string().trim().min(2, 'نام باید حداقل ۲ حرف باشد').max(80, 'نام حداکثر ۸۰ حرف است'),
  lastName: z
    .string()
    .trim()
    .min(2, 'نام خانوادگی باید حداقل ۲ حرف باشد')
    .max(80, 'نام خانوادگی حداکثر ۸۰ حرف است'),
  phone: MobileSchema,
});
export type CredentialsValues = z.infer<typeof CredentialsSchema>;

export const OtpCodeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, 'کد تایید باید ۶ رقم باشد'),
});
export type OtpCodeValues = z.infer<typeof OtpCodeSchema>;

/** Booth completion — mirrors `PATCH /auth/sellers/me` field rules. */
export const BoothSchema = z.object({
  shopName: z
    .string()
    .trim()
    .min(2, 'نام غرفه باید حداقل ۲ حرف باشد')
    .max(160, 'نام غرفه حداکثر ۱۶۰ حرف است'),
  workplacePhone: z
    .string()
    .regex(/^\d{8,11}$/, 'تلفن محل کار معتبر نیست')
    .optional()
    .or(z.literal('')),
  province: z.string().min(1, 'استان را انتخاب کنید'),
  city: z.string().trim().min(1, 'شهر را وارد کنید'),
  postalCode: z
    .string()
    .regex(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد')
    .optional()
    .or(z.literal('')),
  salesType: z.enum(['SUPERMARKET', 'STORE'], {
    message: 'نوع فروش را انتخاب کنید',
  }),
  address: z.string().trim().min(1, 'آدرس را وارد کنید'),
});
export type BoothValues = z.infer<typeof BoothSchema>;

export const RoleSchema = z
  .object({
    accountType: AccountTypeSchema,
    activityType: z.string().min(1, 'نوع فعالیت را انتخاب کنید'),
    guildType: z.string().optional(),
    industryType: z.string().optional(),
    category: z.string().optional(),
    documentType: DocumentTypeSchema,
    document: z
      .instanceof(File, { message: 'تصویر مدرک را بارگذاری کنید' })
      .refine((file) => DOCUMENT_ACCEPTED_MIME.includes(file.type), 'فرمت فایل مجاز نیست')
      .refine(
        (file) => file.size <= DOCUMENT_MAX_SIZE_MB * 1024 * 1024,
        `حجم فایل باید کمتر از ${DOCUMENT_MAX_SIZE_MB} مگابایت باشد`,
      )
      .nullable(),
  })
  .superRefine((values, ctx) => {
    if (values.accountType === 'BUYER' && !values.guildType) {
      ctx.addIssue({ code: 'custom', path: ['guildType'], message: 'گروه صنفی را انتخاب کنید' });
    }

    if (values.accountType !== 'BUYER') {
      if (!values.industryType) {
        ctx.addIssue({
          code: 'custom',
          path: ['industryType'],
          message: 'حوزه فعالیت را انتخاب کنید',
        });
      }
      if (!values.category) {
        ctx.addIssue({ code: 'custom', path: ['category'], message: 'دسته‌بندی را انتخاب کنید' });
      }
      if (!(values.document instanceof File)) {
        ctx.addIssue({
          code: 'custom',
          path: ['document'],
          message: 'تصویر مدرک را بارگذاری کنید',
        });
      }
    }
  });
export type RoleValues = z.infer<typeof RoleSchema>;
