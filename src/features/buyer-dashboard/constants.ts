import type { StatusIconStatus } from '@/components/ui';
import type { OrderStatus, PaymentStatus } from '@/contracts/endpoints/orders';
import { PATHS, type DashboardRole } from '@/routes/paths';
import type { Channel } from '@/validations/primitives';
import type { BuyerChannelConfig } from './types';

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
  addresses: 'آدرس ها',
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

/* ------------------------------ Channels ------------------------------ */

/** Wholesale buyer dashboard (teal). */
const WHOLESALE_BUYER: BuyerChannelConfig = {
  channel: 'WHOLESALE',
  theme: 'wholesale',
  paths: PATHS.DASHBOARD.WHOLESALE_BUYER,
  productHref: PATHS.WHOLESALE.PRODUCT,
  statCards: [
    { status: 'DELIVERED', label: 'تحویل شده' },
    { status: 'PROCESSING', label: 'درحال پردازش' },
    { status: 'CANCELLED', label: 'لغو شده' },
  ],
  orderStatusLabels: ORDER_STATUS_LABELS,
  profileVariant: 'business',
};

/** Retail buyer dashboard (amber). */
const RETAIL_BUYER: BuyerChannelConfig = {
  channel: 'RETAIL',
  theme: 'retail',
  paths: PATHS.DASHBOARD.RETAIL_BUYER,
  productHref: PATHS.RETAIL.PRODUCT,
  statCards: [
    { status: 'PROCESSING', label: 'درحال پیگیری' },
    { status: 'DELIVERED', label: 'ارسال شده' },
    { status: 'RETURNED', label: 'مرجوع شده' },
  ],
  orderStatusLabels: {
    PROCESSING: 'درحال پیگیری',
    DELIVERED: 'تحویل داده شد',
    RETURNED: 'مرجوع شد',
    CANCELLED: 'لغو شد',
  },
  profileVariant: 'address',
};

export const BUYER_CHANNELS: Record<Channel, BuyerChannelConfig> = {
  WHOLESALE: WHOLESALE_BUYER,
  RETAIL: RETAIL_BUYER,
};

export const getBuyerChannel = (channel: Channel): BuyerChannelConfig => BUYER_CHANNELS[channel];

/** `/dashboard/[role]` segment → the channel its pages render for. */
export const BUYER_ROLE_CHANNELS: Record<DashboardRole, Channel> = {
  'wholesale-buyer': 'WHOLESALE',
  'retail-buyer': 'RETAIL',
};
