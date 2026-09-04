import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'outline' | 'fill' | 'ghost';
export type CardRadius = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type CardShadow = 'none' | 'sm' | 'md' | 'lg';

export interface CardImage {
  src: string;
  alt?: string;
  badge?: ReactNode;
  secondaryBadge?: ReactNode;
  href?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
}

export interface CardPrice {
  current: string;
  original?: string;
  currency?: string;
  label?: string;
}

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: CardVariant;
  radius?: CardRadius;
  shadow?: CardShadow;
  header?: ReactNode;
  image?: CardImage;
  title?: ReactNode;
  description?: ReactNode;
  price?: CardPrice;
  action?: ReactNode;
  /** Rendered in the same row as `action`, on the leading side in RTL. */
  stock?: ReactNode;
  contentClassName?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  titleClassName?: string;
  descriptionClassName?: string;
  priceClassName?: string;
  actionClassName?: string;
}
