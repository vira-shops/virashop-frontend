export const ADDRESS_COPY = {
  add: 'اضافه کردن آدرس جدید',
  province: 'استان',
  city: 'شهر',
  postalCode: 'کد پستی',
  plaque: 'پلاک',
  unit: 'واحد',
  line: 'آدرس',
  choose: 'انتخاب کنید',
  lineHint: 'آدرس دقیق را بنویسید و موقعیت آن را روی نقشه مشخص کنید',
  save: 'ثبت',
  cancel: 'انصراف',
  edit: 'ویرایش',
  remove: 'حذف',
  rowMenu: (region: string) => `گزینه‌های آدرس ${region}`,
  defaultGroup: 'آدرس پیش فرض',
  saved: 'آدرس با موفقیت ذخیره شد',
  saveFailed: 'ذخیره آدرس با خطا مواجه شد',
  removed: 'آدرس حذف شد',
} as const;

/** «آدرس ۱», «آدرس ۲», … — the street field's label in the form. */
export const addressFormTitle = (index: number): string =>
  `${ADDRESS_COPY.line} ${index.toLocaleString('fa-IR')}`;

export const ADDRESSES_EMPTY = { message: 'هنوز آدرسی ثبت', highlight: 'نشده است' } as const;

export const SKELETON_COUNT = 2;

/* ---------------------------- Layout / styling ---------------------------- */

/** The one white card holding the rows, the form and the add link. */
export const ADDRESS_CARD_CLASS = 'rounded-8 flex flex-col border border-blue-100 bg-white px-7';

/** Every field label — body-xs, muted blue (same as the profile). */
export const ADDRESS_LABEL_CLASS = 'text-body-xs text-blue-300';

export const ADDRESS_FIELD_PROPS = {
  variant: 'ghost',
  fullWidth: true,
  labelClassName: ADDRESS_LABEL_CLASS,
  className: 'bg-blue-50',
} as const;
