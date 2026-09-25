import type { OrderStatus } from '@/contracts/endpoints/orders';

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
}

export interface DateRangeChipProps {
  from?: string;
  to?: string;
  onClear: () => void;
}
