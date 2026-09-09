'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselIndicator,
  type CarouselApi,
} from '@/components/ui';
import { cn } from '@/utils/ui';
import type { ImageCarouselProps } from './types';

/**
 * Image-only carousel — pass an array of images and one full-bleed slide is
 * built per image. Dot navigation sits ON TOP of the image (white dots), no
 * arrows, optional autoplay. Built on the embla Carousel primitive; the
 * viewport padding is zeroed so no part of the neighboring slide leaks in.
 */
export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoplayMs = 5000,
  rounded = true,
  id,
  className,
  slideClassName = 'h-52 sm:h-72 lg:h-96',
  showDots = true,
}) => {
  const [api, setApi] = React.useState<CarouselApi | null>(null);

  React.useEffect(() => {
    if (!api || autoplayMs <= 0 || images.length < 2) return;

    const timer = window.setInterval(() => {
      api.scrollTo((api.selectedScrollSnap() + 1) % images.length);
    }, autoplayMs);

    return () => window.clearInterval(timer);
  }, [api, autoplayMs, images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div id={id} className={cn('relative', className)}>
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent className="p-0!">
          {images.map((image, index) => {
            const slide = (
              <div
                className={cn(
                  'relative w-full overflow-hidden',
                  rounded && 'rounded-9',
                  slideClassName,
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt ?? ''}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 1440px"
                  className="object-cover"
                />
              </div>
            );

            return (
              <CarouselItem key={image.id ?? `image-carousel-${index}`} className="basis-full">
                {image.href ? (
                  <Link href={image.href} aria-label={image.alt ?? 'اسلاید'}>
                    {slide}
                  </Link>
                ) : (
                  slide
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* White dots overlaid on the image — no arrows */}
        {showDots && (
          <CarouselIndicator className="pointer-events-auto absolute inset-x-0 bottom-10 z-10 mt-0 justify-center [&_.carousel-indicator]:bg-white/60 [&_.carousel-indicator-active]:bg-white" />
        )}
      </Carousel>
    </div>
  );
};

ImageCarousel.displayName = 'ImageCarousel';
