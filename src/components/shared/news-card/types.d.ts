export interface NewsCardProps {
  image: {
    src: string;
    alt?: string;
  };
  title: string;
  /** Short teaser under the title, clamped to two lines. */
  excerpt: string;
  /** Read-more link target; when omitted the link is not rendered. */
  href?: string;
  /** @default "مشاهده بیشتر" */
  linkLabel?: string;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  imageWrapperClassName?: string;
  imageClassName?: string;
  titleClassName?: string;
  excerptClassName?: string;
  linkClassName?: string;
}
