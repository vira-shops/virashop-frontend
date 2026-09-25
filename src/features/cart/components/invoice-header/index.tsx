'use client';

import * as React from 'react';
import { Typography } from '@/components/ui';
import { invoiceTitle } from './constants';
import { SellerMark } from './seller-mark';
import type { InvoiceHeaderProps } from './types';

export { SellerMark } from './seller-mark';
export type { InvoiceHeaderProps } from './types';

/** «فاکتور فروشگاه X» with the seller's mark, above steps 2–4. */
export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ seller }) => (
  <div className="flex items-center justify-start gap-3">
    <SellerMark seller={seller} />

    <Typography variant="body-sm" className="text-gray-700">
      {invoiceTitle(seller.shopName)}
    </Typography>
  </div>
);

InvoiceHeader.displayName = 'InvoiceHeader';
