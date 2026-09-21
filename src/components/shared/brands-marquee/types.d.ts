/** One logo tile in the marquee rows. */
export interface BrandsMarqueeBrand {
  /** Stable React key. */
  id: string;
  logo: string;
  name: string;
  logoAlt?: string;
}

export type BrandsMarqueeLogoSize = 'sm' | 'md';

export interface BrandsMarqueeProps {
  /** Brand logos distributed round-robin across the marquee rows. */
  brands: BrandsMarqueeBrand[];
  /** Center CTA button label — also the section's default accessible name, even when the CTA itself is hidden via `showCta`. */
  ctaLabel: string;
  /** CTA renders a link when set (Next.js Link), otherwise a plain button. */
  ctaHref?: string;
  /** CTA click handler (only used when `ctaHref` is omitted). */
  onCtaClick?: () => void;
  /** Renders the center CTA button. @default true */
  showCta?: boolean;
  /** Rows the logos are distributed across. @default 3 */
  rowCount?: number;
  /** Logo tile size. @default 'md' */
  logoSize?: BrandsMarqueeLogoSize;
  /** Accessible name for the section. @default ctaLabel */
  ariaLabel?: string;
  className?: string;
  /** Style escape hatch for the center CTA button (e.g. brand glow shadow). */
  ctaClassName?: string;
}
