import type { BuyType, Gender } from '@/contracts/endpoints/profile';
import type { ProfileSection } from './types';

export const PROFILE_SECTIONS: Record<ProfileSection, string> = {
  personal: 'اطلاعات شخصی',
  business: 'اطلاعات کسب‌وکار',
};

/** Phone-only tabs that switch between the two cards. */
export const PROFILE_SECTION_TABS: ReadonlyArray<{ value: ProfileSection; label: string }> = [
  { value: 'personal', label: PROFILE_SECTIONS.personal },
  { value: 'business', label: PROFILE_SECTIONS.business },
];

export const PROFILE_LABELS = {
  edit: 'ویرایش',
  save: 'ذخیره تغییرات',
  cancel: 'انصراف',
  saved: 'اطلاعات با موفقیت ذخیره شد',
  saveFailed: 'ذخیره اطلاعات با خطا مواجه شد',
  fullName: 'نام و نام خانوادگی',
  mobile: 'تلفن همراه',
  nationalId: 'کد ملی',
  birthDate: 'تاریخ تولد',
  gender: 'جنسیت',
  genderPlaceholder: 'مرد / زن',
  businessName: 'نام کسب‌وکار',
  businessPhone: 'تلفن محل کار',
  location: 'محل کسب‌وکار',
  province: 'استان',
  city: 'شهر',
  postalCode: 'کد پستی',
  buyType: 'نوع خرید',
  address: 'آدرس',
  document: 'احراز هویت',
  documentPlaceholder: 'کارت ملی یا پروانه کسب',
  avatar: 'تصویر پروفایل',
} as const;

export const GENDER_OPTIONS: ReadonlyArray<{ value: Gender; label: string }> = [
  { value: 'MALE', label: 'مرد' },
  { value: 'FEMALE', label: 'زن' },
];

export const BUY_TYPE_OPTIONS: ReadonlyArray<{ value: BuyType; label: string }> = [
  { value: 'SHOP', label: 'دکه' },
  { value: 'SUPERMARKET', label: 'سوپر مارکت' },
  { value: 'STORE', label: 'فروشگاه' },
];

export const DOCUMENT_ACCEPT = 'image/jpeg,image/png,application/pdf';
export const DOCUMENT_MAX_SIZE_MB = 5;

/* ---------------------------- Layout / styling ---------------------------- */

/** Personal card on the start side, business card twice as wide (desktop). */
export const PROFILE_GRID_CLASS =
  'grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]';

export const PROFILE_CARD_CLASS =
  'rounded-8 flex flex-col gap-9 border border-blue-100 bg-white p-7';

/** Hides the card that is not selected in the phone tabs; desktop always shows both. */
export const PROFILE_CARD_HIDDEN_CLASS = 'max-lg:hidden';

/** Every field label in the profile — body-xs, muted blue (per the design). */
export const PROFILE_LABEL_CLASS = 'text-body-xs text-blue-300';

/** The design's soft-filled field boxes — shared by every input in both cards. */
export const PROFILE_FIELD_PROPS = {
  variant: 'ghost',
  fullWidth: true,
  labelClassName: PROFILE_LABEL_CLASS,
  className: 'bg-blue-50',
} as const;

/** Soft-filled panel behind the radio group and the uploader. */
export const PROFILE_PANEL_CLASS = 'rounded-5 bg-blue-50 p-7';
