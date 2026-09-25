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

/**
 * Phones: one label/value row per item. Desktop: a four-column grid whose
 * cells sit label·value side by side, split by hairlines (the design's rhythm).
 */
export const INFO_GRID_CLASS = 'md:grid-cols-4';
export const INFO_ITEM_CLASS =
  'md:justify-start md:border-e md:pe-7 md:[&:nth-child(4n)]:border-e-0';

export const DETAILS_CARD_CLASS =
  'rounded-8 flex flex-col gap-11 border border-blue-100 bg-white p-5 md:p-7';

export const SKELETON_SECTION_COUNT = 3;
