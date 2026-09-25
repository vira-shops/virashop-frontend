import type { OrderLine } from '@/contracts/endpoints/orders';

export interface OrderDetailsProps {
  /** Route param — the order id. */
  orderId: string;
}

export interface ProductCellProps {
  line: OrderLine;
}

export interface MobileLinesProps {
  lines: OrderLine[];
}
