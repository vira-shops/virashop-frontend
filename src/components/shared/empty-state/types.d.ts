import type { ReactNode } from 'react';

/**
 * `card` — small white tile, icon above the message (empty favorites).
 * `inline` — full-width white strip, message only (empty orders list).
 */
export type EmptyStateVariant = 'card' | 'inline';

export interface EmptyStateProps {
  /** Lead text — «متاسفانه کالایی وجود». */
  message: string;
  /** Emphasised tail in the error color — «ندارد». */
  highlight?: string;
  /** Replaces the default box glyph (card variant only). */
  icon?: ReactNode;
  /** @default 'card' */
  variant?: EmptyStateVariant;
  /** Optional call to action under the message. */
  action?: ReactNode;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  messageClassName?: string;
  iconClassName?: string;
}
