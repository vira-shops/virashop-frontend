'use client';

import * as React from 'react';
import Image from 'next/image';
import { Stepper, Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import { formatToman, toFaDigits } from '@/utils/format';
import { lineTotal } from '@/hooks';
import {
  CART_COLUMNS,
  CART_IMAGE_FALLBACK,
  CURRENCY_LABEL,
  PREPAYMENT_STEP,
} from '@/features/cart/constants';
import type { CartLine } from '@/hooks';

export interface CartTableProps {
  lines: CartLine[];
  onShrinksChange: (lineId: string, shrinks: number) => void;
  onUnitsChange: (lineId: string, units: number) => void;
  onPrepaymentChange: (lineId: string, prepayment: number) => void;
}

/**
 * Header and rows share one grid so the columns line up: the product cell
 * takes the slack and every other column sizes to its content, matching the
 * design's 277/97/34/88/88/177/97 rhythm without pinning pixel widths.
 */
const ROW_GRID =
  'grid grid-cols-[minmax(0,1fr)_auto_auto_auto_auto_auto_auto] items-center gap-10 px-7';

/** The design draws all three steppers as one 40px Gray/2 pill. */
const STEPPER_CLASS = 'h-12 gap-3 px-3 justify-self-center';

const HEAD_CELLS = [
  CART_COLUMNS.unitPrice,
  CART_COLUMNS.commission,
  CART_COLUMNS.shrinks,
  CART_COLUMNS.units,
  CART_COLUMNS.prepayment,
  CART_COLUMNS.total,
];

/**
 * Step 2 — the seller's lines with their quantities. Desktop keeps the
 * columns of the design; below `md` each line stacks into labelled rows so
 * the steppers stay usable on a phone.
 */
export const CartTable: React.FC<CartTableProps> = ({
  lines,
  onShrinksChange,
  onUnitsChange,
  onPrepaymentChange,
}) => (
  <div className="rounded-8 overflow-hidden border border-gray-100 bg-white md:pt-7">
    {/* Desktop: one grid row per line, sharing the header's columns. */}
    <div className="hidden md:block">
      <div role="row" className={cn(ROW_GRID, 'pb-4')}>
        <span />
        {HEAD_CELLS.map((label) => (
          <Typography
            key={label}
            variant="body-sm"
            className={cn(
              'text-center',
              label === CART_COLUMNS.total ? 'text-primary' : 'text-gray-700',
            )}
          >
            {label}
          </Typography>
        ))}
      </div>

      <div className="flex flex-col divide-y divide-gray-100 border-t border-gray-100">
        {lines.map((line) => (
          <div key={line.id} className={cn(ROW_GRID, 'py-10')}>
            <ProductCell line={line} />

            <Money value={line.unitPrice} />

            <Typography variant="body-md" className="text-primary-900 text-center">
              {toFaDigits(line.commissionPercent)}%
            </Typography>

            <Stepper
              size="sm"
              value={line.shrinks}
              min={0}
              onChange={(value) => onShrinksChange(line.id, value)}
              formatValue={toFaDigits}
              aria-label={`تعداد شل ${line.name}`}
              className={STEPPER_CLASS}
            />

            <Stepper
              size="sm"
              value={line.units}
              min={0}
              onChange={(value) => onUnitsChange(line.id, value)}
              formatValue={toFaDigits}
              aria-label={`تعداد دانه ${line.name}`}
              className={STEPPER_CLASS}
            />

            <Stepper
              size="sm"
              value={line.prepayment}
              min={0}
              step={PREPAYMENT_STEP}
              unit={CURRENCY_LABEL}
              onChange={(value) => onPrepaymentChange(line.id, value)}
              formatValue={formatToman}
              aria-label={`پیش پرداخت ${line.name}`}
              className={STEPPER_CLASS}
            />

            <Money value={lineTotal(line)} tone="primary" />
          </div>
        ))}
      </div>
    </div>

    {/* Mobile: the same data, stacked and labelled. */}
    <div className="flex flex-col divide-y divide-gray-100 md:hidden">
      {lines.map((line) => (
        <div key={line.id} className="flex flex-col gap-4 p-7">
          <ProductCell line={line} />

          <StackedRow label={CART_COLUMNS.unitPrice}>
            <Money value={line.unitPrice} />
          </StackedRow>

          <StackedRow label={CART_COLUMNS.commission}>
            <Typography variant="body-md" className="text-primary-900">
              {toFaDigits(line.commissionPercent)}%
            </Typography>
          </StackedRow>

          <StackedRow label={CART_COLUMNS.shrinks}>
            <Stepper
              size="sm"
              value={line.shrinks}
              min={0}
              onChange={(value) => onShrinksChange(line.id, value)}
              formatValue={toFaDigits}
              aria-label={`تعداد شل ${line.name}`}
              className={STEPPER_CLASS}
            />
          </StackedRow>

          <StackedRow label={CART_COLUMNS.units}>
            <Stepper
              size="sm"
              value={line.units}
              min={0}
              onChange={(value) => onUnitsChange(line.id, value)}
              formatValue={toFaDigits}
              aria-label={`تعداد دانه ${line.name}`}
              className={STEPPER_CLASS}
            />
          </StackedRow>

          <StackedRow label={CART_COLUMNS.prepayment}>
            <Stepper
              size="sm"
              value={line.prepayment}
              min={0}
              step={PREPAYMENT_STEP}
              unit={CURRENCY_LABEL}
              onChange={(value) => onPrepaymentChange(line.id, value)}
              formatValue={formatToman}
              aria-label={`پیش پرداخت ${line.name}`}
              className={STEPPER_CLASS}
            />
          </StackedRow>

          <StackedRow label={CART_COLUMNS.total}>
            <Money value={lineTotal(line)} tone="primary" />
          </StackedRow>
        </div>
      ))}
    </div>
  </div>
);

/** Amount at 16px with the unit trailing at 12px, as every money cell is drawn. */
const Money: React.FC<{ value: number; tone?: 'default' | 'primary' }> = ({
  value,
  tone = 'default',
}) => (
  <Typography
    variant="body-md"
    className={cn('text-center', tone === 'primary' ? 'text-primary' : 'text-primary-900')}
  >
    {formatToman(value)} <span className="text-caption-md font-light">{CURRENCY_LABEL}</span>
  </Typography>
);

const ProductCell: React.FC<{ line: CartLine }> = ({ line }) => (
  <div className="flex items-center gap-3">
    <span className="rounded-4 relative size-13 shrink-0 overflow-hidden border border-gray-100 bg-white">
      <Image
        src={line.imageUrl ?? CART_IMAGE_FALLBACK}
        alt={line.name}
        fill
        sizes="48px"
        className="object-contain p-1"
      />
    </span>
    <Typography variant="body-sm" className="line-clamp-2 text-black">
      {line.name}
    </Typography>
  </div>
);

const StackedRow: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex items-center justify-between gap-4">
    <Typography variant="body-sm" className="text-gray-700">
      {label}
    </Typography>
    {children}
  </div>
);

CartTable.displayName = 'CartTable';
