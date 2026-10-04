'use client';

import * as React from 'react';
import { Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import type { OfferTableProps } from '@/features/product/components/product-details/types';

/**
 * A titled card of label/value rows with alternating row tints — the shape
 * every pricing block on the selected-seller view uses («تعرفه‌ها»،
 * «قیمت / اقساط»، «طرح فروش شیرینگ»، «مشخصات محصول»).
 */
export const OfferTable: React.FC<OfferTableProps> = ({
  title,
  note,
  rows,
  renderValue,
  footer,
  className,
}) => (
  <section className={cn('flex flex-col gap-3', className)}>
    <div className="flex items-baseline justify-between gap-4">
      <Typography variant="h5" className="text-primary">
        {title}
      </Typography>
      {note && (
        <Typography variant="caption-md" className="text-gray-300">
          {note}
        </Typography>
      )}
    </div>

    <div className="rounded-8 flex flex-col gap-3 overflow-hidden border border-gray-100 bg-white p-5">
      {rows.map((row, index) => (
        <div
          key={row.id}
          className={cn(
            'rounded-8 flex min-h-13 items-center justify-between gap-4 px-7 py-3',
            // Zebra striping starts on the second row, in a 7% wash of the
            // storefront colour (#FFF9ED on retail), as drawn.
            index % 2 === 1 && 'bg-primary/7',
          )}
        >
          <Typography variant="body-sm" className="text-gray-400">
            {row.label}
          </Typography>

          {renderValue?.(row) ?? (
            <Typography
              variant="body-sm"
              className={cn('text-gray-700', row.isStruck && 'text-gray-300 line-through')}
            >
              {row.value}
            </Typography>
          )}
        </div>
      ))}

      {footer && <div className="flex justify-start px-7 pt-2 pb-1">{footer}</div>}
    </div>
  </section>
);

OfferTable.displayName = 'OfferTable';
