import type { BoothValues } from '@/features/auth/validation/schema';
import type { BoothFieldsCopy } from './types';

export const BOOTH_FORM_COPY = {
  title: 'تکمیل اطلاعات غرفه',
  description: 'برای ساخت غرفه فروشندگی، اطلاعات فروشگاه خود را وارد کنید',
  submit: 'ثبت و اتمام',
  submitting: 'در حال ثبت...',
} as const;

export const BOOTH_FIELDS: BoothFieldsCopy = {
  shopName: { label: 'نام غرفه', placeholder: 'نام فروشگاه خود را وارد کنید' },
  province: { label: 'استان', placeholder: 'انتخاب کنید' },
  city: { label: 'شهر', placeholder: 'شهر خود را وارد کنید' },
  salesType: { label: 'نوع فروش' },
  postalCode: { label: 'کد پستی (اختیاری)', placeholder: '۱۰ رقم' },
  workplacePhone: { label: 'تلفن محل کار (اختیاری)', placeholder: '۰۲۱۱۲۳۴۵۶۷۸' },
  address: { label: 'آدرس', placeholder: 'آدرس کامل فروشگاه' },
};

export const BOOTH_DEFAULT_VALUES: BoothValues = {
  shopName: '',
  workplacePhone: '',
  province: '',
  city: '',
  postalCode: '',
  salesType: 'STORE',
  address: '',
};
