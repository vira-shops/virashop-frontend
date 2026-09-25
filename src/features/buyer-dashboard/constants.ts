import type { StatusIconStatus } from '@/components/ui';
import type { OrderStatus, PaymentStatus } from '@/contracts/endpoints/orders';

/*
 * Feature-wide constants only — anything used by a single component lives in
 * that component's own `constants.ts`.
 */

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

/** Orders table + order details. */
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PROCESSING: 'درحال پردازش',
  DELIVERED: 'تحویل شده',
  RETURNED: 'مرجوع شده',
  CANCELLED: 'لغو شده',
};

/** Orders table + order details. */
export const PAYMENT_STATUS_ICONS: Record<
  PaymentStatus,
  { status: StatusIconStatus; label: string }
> = {
  PAID: { status: 'success', label: 'پرداخت شده' },
  FAILED: { status: 'error', label: 'پرداخت ناموفق' },
  PENDING: { status: 'warning', label: 'در انتظار پرداخت' },
};

/** Dashboard recent orders + the orders page. */
export const ORDERS_EMPTY = { message: 'متاسفانه سفارشی وجود', highlight: 'ندارد' } as const;
