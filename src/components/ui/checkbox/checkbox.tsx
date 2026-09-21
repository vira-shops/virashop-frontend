'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import type { CheckboxProps, CheckboxSize } from './types';

/**
 * Box / mark sizing — literal classes so Tailwind's scanner sees them.
 * NOTE: numeric utilities follow this project's `--spacing-1..22` scale
 * (4, 6, 8, 10, 12, 14, 16, … px), NOT Tailwind's 4px multiplier — so
 * `size-7` is 16px and `size-9` is 20px here.
 */
const boxSizeClasses: Record<CheckboxSize, string> = {
  sm: 'size-7',
  md: 'size-9',
};

const markSizeClasses: Record<CheckboxSize, string> = {
  sm: 'size-4',
  md: 'size-5',
};

/** Check / dash marks — swapped by the sibling selectors in `checkbox.css`. */
const CheckMark: React.FC<{ className: string }> = ({ className }) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    className={cn('checkbox-mark checkbox-mark-check', className)}
  >
    <path
      d="M2 6.2 4.7 9 10 3"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DashMark: React.FC<{ className: string }> = ({ className }) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    className={cn('checkbox-mark checkbox-mark-dash', className)}
  >
    <path d="M2.5 6h7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </svg>
);

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  indeterminate,
  size = 'md',
  disabled,
  className,
  boxClassName,
  labelClassName,
  ...inputProps
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // `indeterminate` is a DOM property with no HTML attribute, so it has to be
  // written imperatively for the `:indeterminate` selector to match.
  React.useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = Boolean(indeterminate);
  }, [indeterminate]);

  return (
    <label className={cn('checkbox', disabled && 'checkbox-disabled', className)}>
      <input
        ref={inputRef}
        type="checkbox"
        disabled={disabled}
        className="checkbox-input"
        {...inputProps}
      />
      <span className={cn('checkbox-box', boxSizeClasses[size], boxClassName)} aria-hidden="true">
        <CheckMark className={markSizeClasses[size]} />
        <DashMark className={markSizeClasses[size]} />
      </span>
      {label !== undefined && <span className={cn('checkbox-label', labelClassName)}>{label}</span>}
    </label>
  );
};

Checkbox.displayName = 'Checkbox';
