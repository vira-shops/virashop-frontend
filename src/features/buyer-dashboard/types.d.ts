import type { OrderStatus } from '@/contracts/endpoints/orders';
import type { PATHS } from '@/routes/paths';
import type { Channel } from '@/validations/primitives';

/** Routes of one buyer dashboard (`PATHS.DASHBOARD.*_BUYER`). */
export type BuyerDashboardPaths = (typeof PATHS.DASHBOARD)[keyof typeof PATHS.DASHBOARD];

/** Which second card the profile shows next to the personal info. */
export type BuyerProfileVariant = 'business' | 'address';

export interface OrderStatCardConfig {
  status: OrderStatus;
  label: string;
}

/**
 * Everything that differs between the wholesale and the retail buyer
 * dashboard — the pages themselves are shared.
 */
export interface BuyerChannelConfig {
  channel: Channel;
  /** `data-theme` of the dashboard — also handed to portaled modals. */
  theme: 'wholesale' | 'retail';
  paths: BuyerDashboardPaths;
  /** The storefront product page a line / favorite links to. */
  productHref: (slug: string) => string;
  /** The dashboard's three KPI cards, in design order. */
  statCards: OrderStatCardConfig[];
  /** Order-status wording differs between the two designs. */
  orderStatusLabels: Record<OrderStatus, string>;
  profileVariant: BuyerProfileVariant;
}

/** Every buyer page section takes the channel it renders for. */
export interface BuyerChannelProps {
  channel: Channel;
}
