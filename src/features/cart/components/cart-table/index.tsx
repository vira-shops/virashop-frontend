'use client';

import * as React from 'react';
import Image from 'next/image';
import { Stepper, Typography } from '@/components/ui';
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
  <div className="rounded-9 bg-white p-5 shadow-sm">
    {/* Desktop: one grid row per line, sharing the header's columns. */}
    <div className="hidden md:block">
      <div
        role="row"
        className="grid grid-cols-[minmax(0,2fr)_repeat(6,minmax(0,1fr))] items-center gap-3 px-2 pb-4"
      >
        <span />
        {HEAD_CELLS.map((label) => (
          <Typography key={label} variant="body-sm" className="text-center text-gray-400">
            {label}
          </Typography>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {lines.map((line) => (
          <div
            key={line.id}
            className="rounded-8 grid grid-cols-[minmax(0,2fr)_repeat(6,minmax(0,1fr))] items-center gap-3 px-2 py-3"
          >
            <ProductCell line={line} />

            <Money value={line.unitPrice} />

            <Typography variant="body-sm" className="text-center text-gray-400">
              {toFaDigits(line.commissionPercent)}%
            </Typography>

            <Stepper
              size="sm"
              value={line.shrinks}
              min={0}
              onChange={(value) => onShrinksChange(line.id, value)}
              formatValue={toFaDigits}
              aria-label={`تعداد شل ${line.name}`}
              className="justify-self-center"
            />

            <Stepper
              size="sm"
              value={line.units}
              min={0}
              onChange={(value) => onUnitsChange(line.id, value)}
              formatValue={toFaDigits}
              aria-label={`تعداد دانه ${line.name}`}
              className="justify-self-center"
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
              className="justify-self-center"
            />

            <Typography variant="body-sm" className="text-primary text-center font-bold">
              {formatToman(lineTotal(line))} {CURRENCY_LABEL}
            </Typography>
          </div>
        ))}
      </div>
    </div>

    {/* Mobile: the same data, stacked and labelled. */}
    <div className="flex flex-col gap-4 md:hidden">
      {lines.map((line) => (
        <div key={line.id} className="rounded-8 flex flex-col gap-4 p-4">
          <ProductCell line={line} />

          <StackedRow label={CART_COLUMNS.unitPrice}>
            <Money value={line.unitPrice} />
          </StackedRow>

          <StackedRow label={CART_COLUMNS.commission}>
            <Typography variant="body-sm" className="text-gray-400">
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
            />
          </StackedRow>

          <StackedRow label={CART_COLUMNS.total}>
            <Typography variant="body-sm" className="text-primary font-bold">
              {formatToman(lineTotal(line))} {CURRENCY_LABEL}
            </Typography>
          </StackedRow>
        </div>
      ))}
    </div>
  </div>
);

const Money: React.FC<{ value: number }> = ({ value }) => (
  <Typography variant="body-sm" className="text-center text-gray-400">
    {formatToman(value)} {CURRENCY_LABEL}
  </Typography>
);

const ProductCell: React.FC<{ line: CartLine }> = ({ line }) => (
  <div className="flex items-center gap-3">
    <span className="rounded-6 relative size-11 shrink-0 overflow-hidden bg-white">
      <Image
        src={line.imageUrl ?? CART_IMAGE_FALLBACK}
        alt={line.name}
        fill
        sizes="32px"
        className="object-contain"
      />
    </span>
    <Typography variant="body-sm" className="line-clamp-2 text-gray-700">
      {line.name}
    </Typography>
  </div>
);

const StackedRow: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex items-center justify-between gap-4">
    <Typography variant="body-sm" className="text-gray-300">
      {label}
    </Typography>
    {children}
  </div>
);

CartTable.displayName = 'CartTable';
