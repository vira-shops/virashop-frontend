import type { ReactNode } from 'react';

export interface CategoryCardProps {
  title: ReactNode;
  image: string;
  imageAlt?: string;
  href?: string;
  onClick?: () => void;
  /**
   * Renders a "…more" style overlay label centered on the card instead of the
   * image — used on the last card of a truncated mobile row.
   */
  moreLabel?: ReactNode;
  className?: string;
}
