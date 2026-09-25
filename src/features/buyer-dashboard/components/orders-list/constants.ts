import type { OrderStatus } from '@/contracts/endpoints/orders';
import type { OrderTabConfig } from './types';

/** The tabs, in design order. `PROCESSING` reads «جاری» here. */
export const ORDER_TABS: ReadonlyArray<OrderTabConfig> = [
  { value: 'PROCESSING', label: 'جاری' },
  { value: 'DELIVERED', label: 'تحویل شده' },
  { value: 'RETURNED', label: 'مرجوع شده' },
  { value: 'CANCELLED', label: 'لغو شده' },
];

export const DEFAULT_ORDER_TAB: OrderStatus = 'PROCESSING';

export const ORDERS_TOOLBAR = {
  searchLabel: 'جستجوی کد پیگیری',
  searchPlaceholder: 'کد پیگیری سفارش را وارد کنید',
  dateLabel: 'جستجو بر اساس تاریخ',
  clearFilters: 'حذف فیلتر تاریخ',
  rangePrefix: 'بازه:',
  rangeFrom: 'از',
  rangeTo: 'تا',
} as const;

/** Count chip of the selected tab — dark, like the design. */
export const ACTIVE_TAB_COUNT_CLASS = 'bg-blue-900 text-white';
