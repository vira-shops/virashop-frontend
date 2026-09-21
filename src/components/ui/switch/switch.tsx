'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import type { SwitchProps, SwitchSize } from './types';

/**
 * Track / thumb sizing — literal classes so Tailwind's scanner sees them.
 * NOTE: numeric utilities follow this project's `--spacing-1..22` scale
 * (4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 32, 40, 48 px), NOT Tailwind's 4px
 * multiplier — `h-9` is 20px, `w-11` is 32px, `w-13` is 48px here.
 */
const trackSizeClasses: Record<SwitchSize, string> = {
  sm: 'h-9 w-11',
  md: 'h-10 w-13',
};

const thumbSizeClasses: Record<SwitchSize, string> = {
  sm: 'size-7',
  md: 'size-9',
};

/** Thumb travel: its offset when off / on (track width − thumb − inset). */
const thumbTravel: Record<SwitchSize, React.CSSProperties> = {
  sm: { '--switch-thumb-off': '2px', '--switch-thumb-on': '14px' } as React.CSSProperties,
  md: { '--switch-thumb-off': '2px', '--switch-thumb-on': '26px' } as React.CSSProperties,
};

export const Switch: React.FC<SwitchProps> = ({
  label,
  size = 'md',
  disabled,
  className,
  trackClassName,
  labelClassName,
  ...inputProps
}) => (
  <label
    style={thumbTravel[size]}
    className={cn('switch', disabled && 'switch-disabled', className)}
  >
    <input
      type="checkbox"
      role="switch"
      disabled={disabled}
      className="switch-input"
      {...inputProps}
    />
    <span className={cn('switch-track', trackSizeClasses[size], trackClassName)} aria-hidden="true">
      <span className={cn('switch-thumb', thumbSizeClasses[size])} />
    </span>
    {label !== undefined && <span className={cn('switch-label', labelClassName)}>{label}</span>}
  </label>
);

Switch.displayName = 'Switch';
