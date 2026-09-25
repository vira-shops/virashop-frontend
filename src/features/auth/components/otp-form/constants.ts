import type { OtpFormCopy } from './types';

export const OTP_FORM_COPY: OtpFormCopy = {
  title: 'کد تایید را وارد کنید',
  sentTo: (phone) => `برای شماره ${phone} یک کد ۶ رقمی ارسال کرده‌ایم،`,
  enterBelow: 'لطفا آن را در فیلد زیر وارد نمایید.',
  resend: 'ارسال مجدد',
  resendIn: (countdown) => `ارسال مجدد (${countdown})`,
  submit: 'تایید و ورود',
  submitting: 'در حال بررسی...',
  signupExpired: 'مهلت ثبت‌نام به پایان رسیده است؛ دوباره تلاش کنید',
};
