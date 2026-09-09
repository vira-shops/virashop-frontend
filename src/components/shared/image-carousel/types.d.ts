import type { FC, ReactNode } from 'react';

export interface ImageCarouselImage {
  /** Optional React key. */
  id?: string;
  src: string;
  alt?: string;
  /** When set, the whole slide becomes a link. */
  href?: string;
}

export interface ImageCarouselProps {
  /** One slide is built per image. */
  images: readonly ImageCarouselImage[];
  /** Auto-advance interval; 0 disables autoplay. @default 5000 */
  autoplayMs?: number;
  /** @default true — rounded-9 slide corners. */
  rounded?: boolean;
  /** DOM id — lets other elements scroll to this carousel. */
  id?: string;
  className?: string;
  /** Height/size classes for each slide. @default 'h-44 sm:h-56 lg:h-64' */
  slideClassName?: string;
  /** Dots overlay on top of the image. @default true */
  showDots?: boolean;
  children?: ReactNode;
}

export type ImageCarouselPropsComponent = FC<ImageCarouselProps>;
