import type { InputHTMLAttributes, ReactNode } from 'react';

export type SwitchSize = 'sm' | 'md';

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'className'
> {
  label?: ReactNode;
  size?: SwitchSize;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  trackClassName?: string;
  labelClassName?: string;
}
