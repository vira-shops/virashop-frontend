export interface ThumbnailImage {
  src: string;
  alt?: string;
}

export type ThumbnailSize = 'sm' | 'md' | 'lg';

export interface ThumbnailStackProps {
  images: ThumbnailImage[];
  /** How many thumbs to show before collapsing the rest into «+n». @default 4 */
  max?: number;
  /** sm 32px · md 48px · lg 64px. @default 'md' */
  size?: ThumbnailSize;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  itemClassName?: string;
}
