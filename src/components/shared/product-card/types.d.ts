/** Buy-button wiring — renders as a Next.js Link when `href` is given, else a `<button>`. */
export interface ProductCardAction {
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * `vertical` is the default card used everywhere (grids, carousels, banners).
 * `horizontal` is the compact list row — image beside the content — used by
 * the catalog listing on mobile.
 */
export type ProductCardOrientation = 'vertical' | 'horizontal';

export interface ProductCardProps {
  image: {
    src: string;
    alt?: string;
  };
  /** Top-right (RTL start) badge — e.g. "اقساط ۵ ماهه". */
  startBadge?: string;
  /** Top-left (RTL end) badge — e.g. "۲۰٪ تخفیف". */
  endBadge?: string;
  title: string;
  priceLabel?: string;
  price?: string;
  stockNote?: string;
  action?: ProductCardAction;
  /** @default 'vertical' */
  orientation?: ProductCardOrientation;
  /**
   * Keeps the badge row's height even when this card has no badge, so a row
   * of cards where only some carry badges still lines up. `ProductGrid` sets
   * this for you when any of its items has one.
   */
  reserveBadgeRow?: boolean;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  headerClassName?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  separatorClassName?: string;
  priceRowClassName?: string;
  priceLabelClassName?: string;
  priceClassName?: string;
  stockNoteClassName?: string;
  actionRowClassName?: string;
}
