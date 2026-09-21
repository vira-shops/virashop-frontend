'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import type { RadioProps, RadioSize } from './types';

/**
 * Ring / dot sizing — literal classes so Tailwind's scanner sees them, and
 * because `@utility` blocks with nested selectors do not apply here. NOTE the
 * project's `--spacing-1..22` scale: `size-7` is 16px, `size-9` is 20px.
 */
const ringSizeClasses: Record<RadioSize, string> = {
  sm: 'size-7',
  md: 'size-9',
};

const dotSizeClasses: Record<RadioSize, string> = {
  sm: 'size-3',
  md: 'size-4',
};

export const Radio: React.FC<RadioProps> = ({
  label,
  size = 'md',
  disabled,
  className,
  dotClassName,
  labelClassName,
  ...inputProps
}) => (
  <label className={cn('radio', disabled && 'radio-disabled', className)}>
    <input type="radio" disabled={disabled} className="radio-input" {...inputProps} />

    <span className={cn('radio-ring', ringSizeClasses[size])} aria-hidden="true">
      <span className={cn('radio-dot', dotSizeClasses[size], dotClassName)} />
    </span>

    {label !== undefined && <span className={cn('radio-label', labelClassName)}>{label}</span>}
  </label>
);

Radio.displayName = 'Radio';
