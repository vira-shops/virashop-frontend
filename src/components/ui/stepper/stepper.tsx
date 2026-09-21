'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import type { StepperProps, StepperSize } from './types';

const sizeClasses: Record<StepperSize, string> = {
  sm: 'gap-2 px-2 py-1',
  md: 'gap-7 px-6 py-3',
};

const buttonSizeClasses: Record<StepperSize, string> = {
  sm: 'size-4',
  md: 'size-6 text-h6',
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

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
        <span className="steper-value-unit">{unit ? ` ${unit}` : ''}</span>
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
