'use client';

import * as React from 'react';
import Image from 'next/image';
import { Typography } from '@/components/ui';
import { ShopIcon } from '@icons';
import type { CartSeller } from '@/hooks';

export interface InvoiceHeaderProps {
  seller: CartSeller;
}

/** «فاکتور فروشگاه X» with the seller's mark, above steps 2–4. */
export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ seller }) => (
  <div className="flex items-center justify-start gap-3">
    <SellerMark seller={seller} />

    <Typography variant="body-sm" className="font-bold text-gray-700">
      فاکتور فروشگاه {seller.shopName}
    </Typography>
  </div>
);

/** Seller logo, falling back to a generic shop glyph. */
export const SellerMark: React.FC<{ seller: CartSeller }> = ({ seller }) => (
  <span className="rounded-4 relative flex size-13 shrink-0 items-center justify-center overflow-hidden border border-gray-100 bg-white text-gray-300">
    {seller.logoUrl ? (
      <Image src={seller.logoUrl} alt="" fill sizes="48px" className="object-contain" />
    ) : (
      <ShopIcon className="size-10" aria-hidden="true" />
    )}
  </span>
);

InvoiceHeader.displayName = 'InvoiceHeader';
