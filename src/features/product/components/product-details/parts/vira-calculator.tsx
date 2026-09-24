'use client';

import * as React from 'react';
import { Stepper, Typography, ValueSlider } from '@/components/ui';
import { NoteIcon } from '@icons';
import { formatToman, toFaDigits } from '@/utils/format';
import { CURRENCY_LABEL } from '@/features/product/components/product-details/constants';
import { cn } from '@/utils/ui';
import type { OfferCalculator } from '@/contracts/endpoints/products';

export interface ViraCalculatorProps {
  calculator: OfferCalculator;
}

/** Terms sit three to a line in both designs. */
const TERMS_PER_LINE = 3;

/** 48px cell; the picked column is tinted, the rest are hairline outlines. */
const cellClass = (isSelected: boolean) =>
  cn(
    'rounded-4 flex h-13 items-center justify-center border px-4 transition-colors',
    isSelected
      ? 'border-primary bg-primary-50 text-primary'
      : 'border-gray-100 bg-white text-gray-700 hover:border-gray-300',
  );

/** Outlined pill, not the gray one — the calculator draws its own steppers. */
const STEPPER_CLASS = 'rounded-4 border-primary h-12 w-[150px] border bg-white';

const chunk = <T,>(items: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size),
  );

/**
 * «ماشین حساب ویرا» — pick a payment term and a quantity, and every term cell
 * reprices live. The sliders share their value with a stepper whenever they
 * measure the same unit, so «۳ شل» never disagrees with itself.
 *
 * Two shapes from one payload: with no `rows` the terms form a flat grid
 * (wholesale); with rows the same terms become the columns of a priced matrix
 * captioned «خرده»/«عمده» (retail).
 */
export const ViraCalculator: React.FC<ViraCalculatorProps> = ({ calculator }) => {
  const { title, note, terms, defaultTermId, rows, quantities, sliders } = calculator;

  const [termId, setTermId] = React.useState(defaultTermId);
  const [axisValues, setAxisValues] = React.useState<Record<string, number>>(() =>
    Object.fromEntries([...quantities, ...sliders].map((axis) => [axis.unit, axis.defaultValue])),
  );

  /** Keyed by unit so a stepper and its matching slider stay in step. */
  const valueOf = (unit: string) => axisValues[unit] ?? 0;
  const setValue = (unit: string, next: number) =>
    setAxisValues((previous) => ({ ...previous, [unit]: next }));

  /** The grid multiplies by the first quantity, as the design's prices do. */
  const multiplier = quantities[0] ? valueOf(quantities[0].unit) : 1;

  const priceCell = (termIndex: number, price: number, key: string) => {
    const term = terms[termIndex];
    const isSelected = term?.id === termId;

    return (
      <button
        key={key}
        type="button"
        role="radio"
        aria-checked={isSelected}
        onClick={() => term && setTermId(term.id)}
        className={cellClass(isSelected)}
      >
        <Typography variant="body-sm" className="text-current">
          {formatToman(price * multiplier)}{' '}
          <span className="text-caption-md font-light">{CURRENCY_LABEL}</span>
        </Typography>
      </button>
    );
  };

  const columnLabels = (line: typeof terms) => (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${line.length}, minmax(0,1fr))` }}
    >
      {line.map((term) => (
        <Typography
          key={term.id}
          variant="body-xs"
          className={cn('text-center', term.id === termId ? 'text-primary' : 'text-gray-300')}
        >
          {term.label}
        </Typography>
      ))}
    </div>
  );

  return (
    <section className="flex flex-col gap-3">
      <Typography variant="body-md" className="text-primary">
        ماشین حساب ویرا
      </Typography>

      <div className="rounded-8 flex flex-col gap-10 border border-gray-100 bg-white p-10">
        {title && (
          <Typography variant="h6" className="text-black">
            {title}
          </Typography>
        )}

        {note && (
          <div className="rounded-4 flex items-center justify-center gap-3 border border-dashed border-gray-300 px-4 py-3">
            <Typography variant="body-xs" className="text-gray-700">
              {note}
            </Typography>
            <NoteIcon className="text-primary size-9 shrink-0" aria-hidden="true" />
          </div>
        )}

        <div role="radiogroup" aria-label="شرایط پرداخت" className="flex flex-col gap-4">
          {rows.length > 0
            ? /* Matrix: terms across, one priced book per row. */
              chunk(terms, TERMS_PER_LINE).map((line, lineIndex) => (
                <div key={lineIndex} className="flex flex-col gap-4">
                  {rows.map((row) => (
                    <div key={row.id} className="flex items-center gap-4">
                      <div
                        className="grid flex-1 gap-4"
                        style={{
                          gridTemplateColumns: `repeat(${line.length}, minmax(0,1fr))`,
                        }}
                      >
                        {line.map((term, columnIndex) => {
                          const termIndex = lineIndex * TERMS_PER_LINE + columnIndex;

                          return priceCell(
                            termIndex,
                            row.prices[termIndex] ?? term.price,
                            `${row.id}-${term.id}`,
                          );
                        })}
                      </div>

                      <Typography variant="body-xs" className="w-12 shrink-0 text-gray-700">
                        {row.label}
                      </Typography>
                    </div>
                  ))}

                  {/* Column captions sit under the last row of the block. */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1">{columnLabels(line)}</div>
                    <span className="w-12 shrink-0" aria-hidden="true" />
                  </div>
                </div>
              ))
            : /* Flat grid: one priced cell per term, captions underneath. */
              chunk(terms, TERMS_PER_LINE).map((line, lineIndex) => (
                <div key={lineIndex} className="flex flex-col gap-4">
                  <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `repeat(${line.length}, minmax(0,1fr))` }}
                  >
                    {line.map((term, columnIndex) =>
                      priceCell(lineIndex * TERMS_PER_LINE + columnIndex, term.price, term.id),
                    )}
                  </div>
                  {columnLabels(line)}
                </div>
              ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-7">
          {quantities.map((axis) => (
            <Stepper
              key={axis.id}
              value={valueOf(axis.unit)}
              onChange={(next) => setValue(axis.unit, next)}
              min={axis.min}
              max={axis.max}
              unit={axis.unit}
              formatValue={toFaDigits}
              aria-label={axis.ariaLabel}
              className={STEPPER_CLASS}
            />
          ))}
        </div>

        <div className="flex flex-col gap-7">
          {sliders.map((slider) => (
            <ValueSlider
              key={slider.id}
              min={slider.min}
              max={slider.max}
              value={valueOf(slider.unit)}
              onValueChange={(next) => setValue(slider.unit, next)}
              formatLabel={(value) => `${toFaDigits(value)} ${slider.unit}`}
              aria-label={slider.ariaLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

ViraCalculator.displayName = 'ViraCalculator';
