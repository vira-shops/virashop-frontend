export interface PromoBannerTile {
  id: string;
  imageAlt?: string;
  href?: string;
  /** Tile background color behind/around the image. */
  background?: string;
}

export interface PromoBannersProps {
  /** @default RETAIL_PROMO_BANNERS from feature constants */
  tiles?: readonly PromoBannerTile[];
  className?: string;
}
