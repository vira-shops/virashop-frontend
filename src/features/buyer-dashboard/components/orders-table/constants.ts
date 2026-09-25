import type { OrderStatus } from '@/contracts/endpoints/orders';

export const ORDER_COLUMN_LABELS = {
  trackingCode: 'کد پیگیری',
  amount: 'مبلغ',
  status: 'وضعیت سفارش',
  products: 'محصولات',
  payment: 'عملیات پرداخت',
  date: 'تاریخ',
} as const;

/** Status text color — static strings so Tailwind's scanner sees them. */
export const ORDER_STATUS_TEXT_CLASSES: Record<OrderStatus, string> = {
  PROCESSING: 'text-blue-300',
  DELIVERED: 'text-warning-green',
  RETURNED: 'text-warning-blue',
  CANCELLED: 'text-warning-red',
};

/** Desktop-only columns — phones keep tracking code + amount, as the design does. */
export const DESKTOP_ONLY_CLASS = 'max-md:hidden';
