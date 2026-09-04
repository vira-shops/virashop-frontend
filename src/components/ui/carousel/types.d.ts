import type useEmblaCarousel from 'embla-carousel-react';
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export type CarouselOrientation = 'horizontal' | 'vertical';

export type CarouselOptions = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;

export type CarouselPlugin = NonNullable<Parameters<typeof useEmblaCarousel>[1]>[number];

export interface CarouselApi {
  canScrollPrev: () => boolean;
  canScrollNext: () => boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  selectedScrollSnap: () => number;
  scrollSnapList: () => number[];
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
}

export type CarouselProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: CarouselOrientation;
  setApi?: (api: CarouselApi) => void;
  /** @default align=start, containScroll=trimSnaps, loop=true */
  opts?: CarouselOptions;
  plugins?: CarouselPlugin[];
  /** Overrides the bundled `loop: true`. */
  loop?: boolean;
  className?: string;
  children?: ReactNode;
};

export type CarouselContentProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children?: ReactNode;
};

export type CarouselItemProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children?: ReactNode;
};

export type CarouselPreviousProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children?: ReactNode;
};

export type CarouselNextProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children?: ReactNode;
};

export type CarouselIndicatorProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export type CarouselGridProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** @default 4 */
  itemsPerSlide?: number;
  /** @default 2 */
  gridCols?: number;
  /** @default 2 */
  gridRows?: number;
  orientation?: CarouselOrientation;
  opts?: CarouselOptions;
  plugins?: CarouselPlugin[];
  loop?: boolean;
  className?: string;
  children?: ReactNode;
};

export type CarouselGridItemProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children?: ReactNode;
};

export type CarouselContextType = {
  carouselRef: (node: HTMLElement | null) => void;
  api: CarouselApi | undefined;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation: CarouselOrientation;
  selectedScrollSnap: () => number;
  scrollSnapList: () => number[];
};
