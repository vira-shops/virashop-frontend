import * as React from 'react';
import Image from 'next/image';
import { ShopIcon } from '@icons';
import type { SellerMarkProps } from './types';

/** Seller logo, falling back to a generic shop glyph. */
export const SellerMark: React.FC<SellerMarkProps> = ({ seller }) => (
  <span className="rounded-4 relative flex size-13 shrink-0 items-center justify-center overflow-hidden border border-gray-100 bg-white text-gray-300">
    {seller.logoUrl ? (
      <Image src={seller.logoUrl} alt="" fill sizes="48px" className="object-contain" />
    ) : (
      <ShopIcon className="size-10" aria-hidden="true" />
    )}
  </span>
);
