'use client';

import * as React from 'react';
import { Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import type { OfferTableRow } from '@/contracts/endpoints/products';

export interface OfferTableProps {
  title: string;
  /** Muted caption beside the title, e.g. «قیمت هر شل». */
  note?: string;
  rows: OfferTableRow[];
  /** Extra content rendered inside a row, keyed by row id (e.g. colour swatches). */
  renderValue?: (row: OfferTableRow) => React.ReactNode;
  /** Right-aligned link under the last row, e.g. «بیشتر». */
  footer?: React.ReactNode;
  className?: string;
}

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
      <Typography variant="body-md" className="text-primary font-bold">
        {title}
      </Typography>
      {note && (
        <Typography variant="caption-md" className="text-gray-300">
          {note}
        </Typography>
      )}
    </div>

    <div className="rounded-9 flex flex-col overflow-hidden bg-white py-2 shadow-sm">
      {rows.map((row, index) => (
        <div
          key={row.id}
          className={cn(
            'mx-2 flex items-center justify-between gap-4 px-4 py-3',
            // Zebra striping starts on the second row, as drawn.
            index % 2 === 1 && 'rounded-6 bg-gray-50',
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

      {footer && <div className="flex justify-start px-6 pt-2 pb-1">{footer}</div>}
    </div>
  </section>
);

OfferTable.displayName = 'OfferTable';
