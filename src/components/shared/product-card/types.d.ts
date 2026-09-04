/** Buy-button wiring — renders as a Next.js Link when `href` is given, else a `<button>`. */
export interface ProductCardAction {
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

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
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  headerClassName?: string;
  imageWrapperClassName?: string;
  imageClassName?: string;
  titleClassName?: string;
  separatorClassName?: string;
  priceRowClassName?: string;
  priceLabelClassName?: string;
  priceClassName?: string;
  stockNoteClassName?: string;
  actionRowClassName?: string;
}
