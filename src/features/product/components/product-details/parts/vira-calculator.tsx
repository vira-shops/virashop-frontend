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

/**
 * «ماشین حساب ویرا» — pick a payment term and a quantity, and every term cell
 * reprices live. The sliders share their value with the stepper whenever they
 * measure the same unit, so «۳ شل» never disagrees with itself.
 */
export const ViraCalculator: React.FC<ViraCalculatorProps> = ({ calculator }) => {
  const { note, terms, defaultTermId, quantity, sliders } = calculator;

  const [termId, setTermId] = React.useState(defaultTermId);
  const [quantityValue, setQuantityValue] = React.useState(quantity.defaultValue);
  const [sliderValues, setSliderValues] = React.useState<Record<string, number>>(() =>
    Object.fromEntries(sliders.map((slider) => [slider.id, slider.defaultValue])),
  );

  const valueOf = (sliderId: string, unit: string) =>
    unit === quantity.unit ? quantityValue : (sliderValues[sliderId] ?? 0);

  const setSlider = (sliderId: string, unit: string, next: number) => {
    if (unit === quantity.unit) {
      setQuantityValue(next);
      return;
    }

    setSliderValues((previous) => ({ ...previous, [sliderId]: next }));
  };

  return (
    <section className="flex flex-col gap-3">
      <Typography variant="body-md" className="text-primary font-bold">
        ماشین حساب ویرا
      </Typography>

      <div className="rounded-9 flex flex-col gap-8 bg-white p-5 shadow-sm">
        <div className="rounded-8 flex items-center justify-end gap-3 border border-dashed border-gray-200 px-4 py-3">
          <Typography variant="caption-md" className="text-gray-400">
            {note}
          </Typography>
          <NoteIcon className="text-primary size-6 shrink-0" aria-hidden="true" />
        </div>

        <div
          role="radiogroup"
          aria-label="شرایط پرداخت"
          className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3"
        >
          {terms.map((term) => {
            const isSelected = term.id === termId;

            return (
              <div key={term.id} className="flex flex-col items-stretch gap-2">
                <button
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setTermId(term.id)}
                  className={cn(
                    'rounded-8 border px-4 py-3 text-center transition-colors',
                    isSelected
                      ? 'border-primary bg-primary-50 text-primary'
                      : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200',
                  )}
                >
                  <Typography variant="caption-md" className="font-bold text-current">
                    {formatToman(term.price * quantityValue)} {CURRENCY_LABEL}
                  </Typography>
                </button>

                <Typography variant="caption-md" className="text-center text-gray-300">
                  {term.label}
                </Typography>
              </div>
            );
          })}
        </div>

        <Stepper
          value={quantityValue}
          onChange={setQuantityValue}
          min={quantity.min}
          max={quantity.max}
          unit={quantity.unit}
          formatValue={toFaDigits}
          aria-label={quantity.ariaLabel}
          fullWidth
          className="justify-center"
        />

        <div className="flex flex-col gap-6">
          {sliders.map((slider) => (
            <ValueSlider
              key={slider.id}
              min={slider.min}
              max={slider.max}
              value={valueOf(slider.id, slider.unit)}
              onValueChange={(next) => setSlider(slider.id, slider.unit, next)}
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
