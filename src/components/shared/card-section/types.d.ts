import type { ProductCardProps } from '@/components/shared/product-card/types';

/** Header link — renders as a Next.js Link when `href` is given, else a `<button>`. */
export interface CardSectionLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

/** One card in the section — `ProductCardProps` plus an optional `id` (React key). */
export type CardSectionItem = ProductCardProps & { id?: string };

export interface CardSectionProps {
  /** Section heading (h4, primary color); also the section's aria-label. */
  title: string;
  description?: string;
  link?: CardSectionLink;
  items: CardSectionItem[];
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  headerClassName?: string;
  titleClassName?: string;
  carouselClassName?: string;
  itemClassName?: string;
}
