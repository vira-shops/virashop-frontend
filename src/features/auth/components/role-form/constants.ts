export const ROLE_FORM_COPY = {
  title: 'اطلاعات کاربری',
  accountType: 'نوع حساب',
  activityType: 'نوع فعالیت',
  guildType: 'نوع صنف',
  industryType: 'نوع صنف',
  category: 'دسته‌بندی',
  selectPlaceholder: 'انتخاب کنید',
  documentLabel: 'مدارک',
  documentPlaceholder: 'جهت آپلود عکس پروانه کسب یا کارت ملی کلیک کنید',
  submit: 'تایید و ثبت‌نام',
  submitting: 'در حال ثبت‌نام...',
} as const;

/** A duplicate signup is recoverable: switch to login and send an OTP instead. */
export const ALREADY_REGISTERED_CODES = ['PHONE_ALREADY_REGISTERED', 'SELLER_ALREADY_EXISTS'];
