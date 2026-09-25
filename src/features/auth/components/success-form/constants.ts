import type { SuccessFormCopy } from './types';

export const SUCCESS_FORM_COPY: SuccessFormCopy = {
  title: 'حساب کاربری شما با موفقیت ایجاد شد!',
  description:
    'اطلاعات شما با موفقیت ثبت گردید. جهت فعال‌سازی کامل غرفه و دسترسی به تمام امکانات، می‌توانید همین حالا پروفایل خود را تکمیل کنید',
  completeProfile: 'تکمیل اطلاعات پروفایل',
  skip: 'بعداً انجام می‌دهم',
};

/** Neutral secondary action — the design's grey «later» button. */
export const SKIP_BUTTON_CLASS =
  'border border-neutral-200 bg-neutral-100 text-neutral-900 hover:bg-neutral-200';
