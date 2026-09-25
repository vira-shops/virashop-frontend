import type { HTMLAttributes } from 'react';

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps extends HTMLAttributes<HTMLSpanElement> {
  /** Filled stars — rounded to the nearest whole star and clamped to `[0, max]`. */
  value: number;
  /** @default 5 */
  max?: number;
  /** @default 'sm' */
  size?: RatingSize;
  /** Overrides the default «امتیاز ۴ از ۵» accessible name. */
  label?: string;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  starClassName?: string;
}
