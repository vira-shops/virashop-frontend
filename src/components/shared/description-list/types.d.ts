import type { ReactNode } from 'react';

export interface DescriptionItem {
  /** Stable key — defaults to the label. */
  id?: string;
  label: string;
  value: ReactNode;
  /** Spans every column (e.g. a long address). */
  fullWidth?: boolean;
}

export interface DescriptionListProps {
  items: DescriptionItem[];
  /**
   * Grid classes. Defaults to one column — the caller owns the breakpoints,
   * e.g. `md:grid-cols-4`.
   */
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  /**
   * Per-item classes. Items default to label-start / value-end on one row
   * (the phone layout); pass e.g. `md:justify-start md:border-e` for the
   * desktop label·value grid with dividers.
   */
  itemClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
}
