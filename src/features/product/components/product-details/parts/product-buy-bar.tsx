'use client';

import * as React from 'react';
import Link from 'next/link';
import { Typography } from '@/components/ui';
import { formatToman } from '@/utils/format';
import {
  CHEAPEST_TAG,
  CURRENCY_LABEL,
} from '@/features/product/components/product-details/constants';

export interface ProductBuyBarProps {
  shopName: string;
  price: number;
  href: string;
}

export const ProductBuyBar: React.FC<ProductBuyBarProps> = ({ shopName, price, href }) => (
  <Link
    href={href}
    className="bg-primary rounded-8 hover:bg-primary-600 flex flex-col items-center justify-between gap-3 px-5 py-4 transition-colors sm:flex-row"
  >
    <Typography variant="body-md" className="text-white">
      خرید از {shopName}
    </Typography>

    <div className="flex items-center gap-3">
      <Typography variant="body-md" className="text-white">
        {formatToman(price)} {CURRENCY_LABEL}
      </Typography>
      <Typography variant="caption-md" className="rounded-5 text-primary bg-white px-3 py-1">
        {CHEAPEST_TAG}
      </Typography>
    </div>
  </Link>
);

ProductBuyBar.displayName = 'ProductBuyBar';
