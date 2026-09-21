import type { InputHTMLAttributes, ReactNode } from 'react';

export type RadioSize = 'sm' | 'md';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Text beside the dot. Omit for a bare control with an external label. */
  label?: ReactNode;
  size?: RadioSize;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  dotClassName?: string;
  labelClassName?: string;
}
