'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import type { StepperProps, StepperSize } from './types';

/**
 * Padding / control sizing as literal classes — `@utility` blocks with nested
 * `& .child` selectors do not apply in this setup, so sizes live here (see
 * AGENTS.md on static class maps).
 */
const sizeClasses: Record<StepperSize, string> = {
  sm: 'gap-6 px-5 py-2',
  md: 'gap-7 px-6 py-3',
};

const buttonSizeClasses: Record<StepperSize, string> = {
  sm: 'size-9 text-body-md',
  md: 'size-10 text-h6',
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Quantity control — «−  ۳ شل  +» in a single bordered pill. The minus sits on
 * the visual start of the pill and the plus on its end, matching the design in
 * both directions.
 */
export const Stepper: React.FC<StepperProps> = ({
  value,
  onChange,
  min = 1,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  unit,
  formatValue = (v) => String(v),
  'aria-label': ariaLabel,
  size = 'md',
  disabled,
  fullWidth,
  className,
  valueClassName,
  buttonClassName,
}) => {
  const set = (next: number) => onChange(clamp(next, min, max));

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      // LTR so the DOM order is the drawn order (−, value, +) in both
      // directions; the value itself opts back into RTL for its Persian unit.
      dir="ltr"
      className={cn(
        'stepper',
        sizeClasses[size],
        disabled && 'stepper-disabled',
        fullWidth && 'w-full',
        className,
      )}
    >
      <button
        type="button"
        aria-label="کاهش"
        disabled={disabled || value <= min}
        onClick={() => set(value - step)}
        className={cn('stepper-button', buttonSizeClasses[size], buttonClassName)}
      >
        <span aria-hidden="true">−</span>
      </button>

      <span dir="rtl" aria-live="polite" className={cn('stepper-value', valueClassName)}>
        {formatValue(value)}
        {unit ? ` ${unit}` : ''}
      </span>

      <button
        type="button"
        aria-label="افزایش"
        disabled={disabled || value >= max}
        onClick={() => set(value + step)}
        className={cn('stepper-button', buttonSizeClasses[size], buttonClassName)}
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
};

Stepper.displayName = 'Stepper';
