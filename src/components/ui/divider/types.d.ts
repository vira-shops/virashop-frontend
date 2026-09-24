import type { HTMLAttributes, ReactNode } from 'react';

export type DividerVariant = 'solid' | 'dashed';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional caption sitting at the start of the line (e.g. «خوانده شده»). */
  label?: ReactNode;
  /** @default 'solid' */
  variant?: DividerVariant;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  labelClassName?: string;
  lineClassName?: string;
}
