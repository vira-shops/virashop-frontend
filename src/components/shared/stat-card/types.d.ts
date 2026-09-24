import type { ReactNode } from 'react';

export interface StatCardProps {
  label: string;
  value: number | string;
  /** Glyph inside the dark circle. */
  icon: ReactNode;
  /** Makes the whole card a link (e.g. to the filtered orders list). */
  href?: string;
  loading?: boolean;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  iconClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
}
