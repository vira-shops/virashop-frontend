import type { OrderStatus, OrderSummary } from '@/contracts/endpoints/orders';
import type { Channel } from '@/validations/primitives';

/** URL search-param keys the list reads and writes. */
export type OrderFilterKey = 'status' | 'from' | 'to' | 'q';

export type OrderFilterPatch = Partial<Record<OrderFilterKey, string | null>>;

export interface OrderTabConfig {
  value: OrderStatus;
  label: string;
}

export interface OrdersToolbarProps {
  status: OrderStatus;
  onStatusChange: (status: string) => void;
  searchOpen: boolean;
  onToggleSearch: () => void;
  onOpenDateRange: () => void;
}

export interface OrdersSearchProps {
  /** The submitted query (from the URL) — seeds the draft. */
  initialQuery?: string;
  onSubmit: (query: string | null) => void;
  /** Adds a calendar button inside the field (the phone layout). */
  onOpenDateRange?: () => void;
  className?: string;
}

export interface OrderCardsProps {
  channel: Channel;
  orders: OrderSummary[];
  'aria-label'?: string;
}

export interface DateRangeChipProps {
  from?: string;
  to?: string;
  onClear: () => void;
}
