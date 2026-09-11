/** One logo tile in the marquee rows. */
export interface BrandsMarqueeBrand {
  /** Stable React key. */
  id: string;
  logo: string;
  name: string;
  logoAlt?: string;
}

export interface BrandsMarqueeProps {
  /** Brand logos distributed round-robin across the marquee rows. */
  brands: BrandsMarqueeBrand[];
  /** Center CTA button label. */
  ctaLabel: string;
  /** CTA renders a link when set (Next.js Link), otherwise a plain button. */
  ctaHref?: string;
  /** CTA click handler (only used when `ctaHref` is omitted). */
  onCtaClick?: () => void;
  /** Rows the logos are distributed across. @default 3 */
  rowCount?: number;
  /** Accessible name for the section. @default ctaLabel */
  ariaLabel?: string;
  className?: string;
  /** Style escape hatch for the center CTA button (e.g. brand glow shadow). */
  ctaClassName?: string;
}
