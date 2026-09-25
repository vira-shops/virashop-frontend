import type { OrderStatCardConfig } from './types';

/** The three KPI cards, in design order. */
export const ORDER_STAT_CARDS: ReadonlyArray<OrderStatCardConfig> = [
  { status: 'DELIVERED', label: 'تحویل شده' },
  { status: 'PROCESSING', label: 'درحال پردازش' },
  { status: 'CANCELLED', label: 'لغو شده' },
];

export const RECENT_ORDERS_TITLE = 'سفارشات اخیر';
export const RECENT_ORDERS_HEADING_ID = 'recent-orders-title';
export const RECENT_ORDERS_LIMIT = 3;
