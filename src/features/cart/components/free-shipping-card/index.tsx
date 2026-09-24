'use client';

import * as React from 'react';
import { Typography } from '@/components/ui';
import { BulkTruckIcon } from '@icons';
import { FREE_SHIPPING_NOTE, FREE_SHIPPING_TITLE } from '@/features/cart/constants';

/** Standing promise shown under the money panel on every checkout step. */
export const FreeShippingCard: React.FC = () => (
  <div className="rounded-9 flex items-center justify-between gap-4 bg-white p-5 shadow-sm">
    <div className="flex flex-col gap-1">
      <Typography variant="caption-lg">{FREE_SHIPPING_TITLE}</Typography>
      <Typography variant="caption-md" className="text-gray-300">
        {FREE_SHIPPING_NOTE}
      </Typography>
    </div>

    <BulkTruckIcon className="text-primary size-13 shrink-0" aria-hidden="true" />
  </div>
);

FreeShippingCard.displayName = 'FreeShippingCard';
