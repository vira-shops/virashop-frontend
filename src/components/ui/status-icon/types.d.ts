import type { HTMLAttributes } from 'react';

/** `success` ✓ green · `error` ✗ red · `warning` ! outlined red circle (e.g. «پرداخت ناموفق»). */
export type StatusIconStatus = 'success' | 'error' | 'warning';

export type StatusIconSize = 'sm' | 'md';

export interface StatusIconProps extends HTMLAttributes<HTMLSpanElement> {
  status: StatusIconStatus;
  /** @default 'md' */
  size?: StatusIconSize;
  /** Screen-reader text — the glyph alone carries no meaning. */
  label?: string;
  className?: string;
}
