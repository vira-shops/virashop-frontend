import type { OrderStatus } from '@/contracts/endpoints/orders';

/** One KPI card — which status it counts and its label. */
export interface OrderStatCardConfig {
  status: OrderStatus;
  label: string;
}
