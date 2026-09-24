'use client';

import * as React from 'react';
import { Button, Typography } from '@/components/ui';
import { formatToman } from '@/utils/format';
import {
  ADD_TO_CART_LABEL,
  CURRENCY_LABEL,
  PRICE_LABEL,
} from '@/features/product/components/product-details/constants';

export interface PurchaseAsideProps {
  price: number;
  onAddToCart?: () => void;
}

/**
 * The buy panel beside the selected seller's terms — the running price and the
 * single call to action.
 */
export const PurchaseAside: React.FC<PurchaseAsideProps> = ({ price, onAddToCart }) => (
  <aside className="rounded-9 flex h-fit flex-col gap-5 bg-white p-5 shadow-sm lg:sticky lg:top-6">
    <div className="flex items-center justify-between gap-4">
      <Typography variant="caption-md" className="text-gray-400">
        {PRICE_LABEL}
      </Typography>
      <Typography variant="body-sm" className="text-gray-700">
        {formatToman(price)} {CURRENCY_LABEL}
      </Typography>
    </div>

    <Button variant="fill" color="primary" size="md" fullWidth onClick={onAddToCart}>
      {ADD_TO_CART_LABEL}
    </Button>
  </aside>
);

PurchaseAside.displayName = 'PurchaseAside';
