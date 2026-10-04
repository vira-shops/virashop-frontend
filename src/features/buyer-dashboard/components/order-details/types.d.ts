import type { OrderLine } from '@/contracts/endpoints/orders';

import type { Channel } from '@/validations/primitives';

export interface OrderDetailsProps {
  channel: Channel;
  /** Route param — the order id. */
  orderId: string;
}

export interface ProductCellProps {
  line: OrderLine;
}

export interface MobileLinesProps {
  lines: OrderLine[];
  /** Builds a line's product-page link (channel storefront). */
  hrefFor: (line: OrderLine) => string;
}
