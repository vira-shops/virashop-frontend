import type { StatusIconStatus } from '@/components/ui';
import type { OrderStatus, PaymentStatus } from '@/contracts/endpoints/orders';
import type { BuyType, Gender } from '@/contracts/endpoints/profile';
import type { ReviewStatus } from '@/contracts/endpoints/reviews';

export const CURRENCY_LABEL = 'تومان';

export const PAGE_TITLES = {
  dashboard: 'داشبورد',
  orders: 'سفارش ها',
  orderDetails: 'جزئیات سفارش',
  favorites: 'علاقه مندی ها',
  notifications: 'اعلان ها',
  reviews: 'نظرات و پرسش',
  profile: 'پروفایل',
} as const;

/* ------------------------------ Orders ------------------------------ */

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PROCESSING: 'درحال پردازش',
  DELIVERED: 'تحویل شده',
  RETURNED: 'مرجوع شده',
  CANCELLED: 'لغو شده',
};

/** Status text color in the tables — static strings so Tailwind sees them. */
export const ORDER_STATUS_TEXT_CLASSES: Record<OrderStatus, string> = {
  PROCESSING: 'text-blue-300',
  DELIVERED: 'text-warning-green',
  RETURNED: 'text-warning-blue',
  CANCELLED: 'text-warning-red',
};

/** The orders page tabs, in design order. `PROCESSING` reads «جاری» there. */
export const ORDER_TABS: ReadonlyArray<{ value: OrderStatus; label: string }> = [
  { value: 'PROCESSING', label: 'جاری' },
  { value: 'DELIVERED', label: 'تحویل شده' },
  { value: 'RETURNED', label: 'مرجوع شده' },
  { value: 'CANCELLED', label: 'لغو شده' },
];

export const DEFAULT_ORDER_TAB: OrderStatus = 'PROCESSING';

/** The dashboard's three KPI cards. */
export const ORDER_STAT_CARDS: ReadonlyArray<{ status: OrderStatus; label: string }> = [
  { status: 'DELIVERED', label: 'تحویل شده' },
  { status: 'PROCESSING', label: 'درحال پردازش' },
  { status: 'CANCELLED', label: 'لغو شده' },
];

export const PAYMENT_STATUS_ICONS: Record<
  PaymentStatus,
  { status: StatusIconStatus; label: string }
> = {
  PAID: { status: 'success', label: 'پرداخت شده' },
  FAILED: { status: 'error', label: 'پرداخت ناموفق' },
  PENDING: { status: 'warning', label: 'در انتظار پرداخت' },
};

export const ORDER_COLUMN_LABELS = {
  trackingCode: 'کد پیگیری',
  amount: 'مبلغ',
  status: 'وضعیت سفارش',
  products: 'محصولات',
  payment: 'عملیات پرداخت',
  date: 'تاریخ',
} as const;

export const RECENT_ORDERS_TITLE = 'سفارشات اخیر';
export const RECENT_ORDERS_LIMIT = 3;

export const ORDERS_EMPTY = { message: 'متاسفانه سفارشی وجود', highlight: 'ندارد' } as const;

export const ORDERS_TOOLBAR = {
  searchLabel: 'جستجوی کد پیگیری',
  searchPlaceholder: 'کد پیگیری سفارش را وارد کنید',
  dateLabel: 'جستجو بر اساس تاریخ',
  clearFilters: 'حذف فیلتر تاریخ',
  rangePrefix: 'بازه:',
  rangeFrom: 'از',
  rangeTo: 'تا',
} as const;

/* --------------------------- Order details --------------------------- */

export const ORDER_DETAIL_SECTIONS = {
  order: 'اطلاعات سفارش',
  sender: 'اطلاعات فرستنده',
  products: 'محصولات',
} as const;

export const ORDER_DETAIL_LABELS = {
  trackingCode: 'کد پیگیری',
  paymentMethod: 'نوع پرداخت',
  shippingMethod: 'ارسال با',
  shippingCost: 'هزینه ارسال',
  subtotal: 'قیمت',
  total: 'قیمت با تخفیف',
  status: 'وضعیت سفارش',
  paymentStatus: 'وضعیت پرداخت',
  date: 'تاریخ',
  fullName: 'نام و نام خانوادگی',
  mobile: 'شماره موبایل',
  nationalId: 'کد ملی',
  postalCode: 'کد پستی',
  plate: 'پلاک',
  address: 'آدرس',
  unitPrice: 'مبلغ واحد',
  quantity: 'تعداد',
  lineTotal: 'جمع کل',
  invoice: 'مشاهده فاکتور',
  free: 'رایگان',
  notFound: 'سفارش مورد نظر یافت نشد',
} as const;

/* ----------------------------- Favorites ----------------------------- */

export const FAVORITES_EMPTY = { message: 'متاسفانه کالایی وجود', highlight: 'ندارد' } as const;
export const FAVORITE_REMOVE_LABEL = 'حذف از علاقه‌مندی‌ها';
export const FAVORITE_BUY_LABEL = 'خرید';

/* --------------------------- Notifications --------------------------- */

export const NOTIFICATIONS_READ_DIVIDER = 'خوانده شده';
export const NOTIFICATIONS_EMPTY = { message: 'اعلانی وجود', highlight: 'ندارد' } as const;

/* ------------------------------ Reviews ------------------------------ */

export const REVIEW_TABS = {
  reviews: 'نظرات شما',
  answers: 'پاسخ ها',
} as const;

export const REVIEW_STATUS_LABELS: Record<ReviewStatus, string> = {
  PENDING: 'در انتظار',
  APPROVED: 'تایید شده',
  REJECTED: 'رد شده',
};

export const REVIEWS_EMPTY = { message: 'هنوز نظری ثبت', highlight: 'نکرده‌اید' } as const;
export const QUESTIONS_EMPTY = { message: 'هنوز پرسشی ثبت', highlight: 'نکرده‌اید' } as const;

/* ------------------------------ Profile ------------------------------ */

export const PROFILE_SECTIONS = {
  personal: 'اطلاعات شخصی',
  business: 'اطلاعات کسب‌وکار',
} as const;

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
