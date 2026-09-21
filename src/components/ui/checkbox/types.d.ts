import type { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxSize = 'sm' | 'md';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'className'
> {
  label?: ReactNode;
  /** Renders the dash state (some, not all, children selected). */
  indeterminate?: boolean;
  size?: CheckboxSize;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  boxClassName?: string;
  labelClassName?: string;
}
