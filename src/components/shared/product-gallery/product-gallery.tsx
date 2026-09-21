'use client';

import * as React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselIndicator } from '@/components/ui';
import { cn } from '@/utils/ui';
import type { ProductGalleryProps } from './types';

/**
 * PDP gallery — desktop: big image + vertical thumbnail strip; mobile:
 * single swipeable image (no thumbnails).
 */
export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  maxThumbnails = 4,
  className,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [showAllThumbnails, setShowAllThumbnails] = React.useState(false);
  const activeImage = images[activeIndex];

  // One slot of the strip becomes the «•••» tile, so the collapsed strip shows
  // one fewer image than it has room for.
  const isCollapsed = !showAllThumbnails && images.length > maxThumbnails;
  const thumbnails = isCollapsed ? images.slice(0, maxThumbnails - 1) : images;

  if (images.length === 0) return null;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Mobile: swipeable single image */}
      <div className="md:hidden">
        <Carousel opts={{ loop: false }}>
          <CarouselContent className="p-0!">
            {images.map((image, index) => (
              <CarouselItem key={image.id ?? index} className="basis-full">
                <div className="rounded-9 relative aspect-square w-full overflow-hidden bg-white">
                  <Image
                    src={image.src}
                    alt={image.alt ?? ''}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && <CarouselIndicator className="justify-center" />}
        </Carousel>
      </div>

      {/* Desktop: big image + vertical thumbnail strip */}
      <div className="hidden gap-4 md:flex">
        {images.length > 1 && (
          <div className="flex flex-col gap-3">
            {thumbnails.map((image, index) => (
              <button
                key={image.id ?? index}
                type="button"
                aria-label={image.alt ?? `تصویر ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'rounded-6 relative h-16 w-16 shrink-0 overflow-hidden border bg-white',
                  index === activeIndex ? 'border-primary-500' : 'border-gray-100',
                )}
              >
                <Image src={image.src} alt="" fill sizes="64px" className="object-contain p-1" />
              </button>
            ))}

            {isCollapsed && (
              <button
                type="button"
                onClick={() => setShowAllThumbnails(true)}
                aria-label={`نمایش ${images.length - thumbnails.length} تصویر دیگر`}
                className="rounded-6 flex h-16 w-16 shrink-0 items-center justify-center border border-gray-100 bg-white text-gray-300 transition-colors hover:text-gray-700"
              >
                <span aria-hidden="true" className="text-body-md leading-none">
                  •••
                </span>
              </button>
            )}
          </div>
        )}
        <div className="rounded-9 relative aspect-square w-full overflow-hidden bg-white">
          {activeImage && (
            <Image
              src={activeImage.src}
              alt={activeImage.alt ?? ''}
              fill
              priority
              sizes="(max-width: 1024px) 50vw, 600px"
              className="object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

ProductGallery.displayName = 'ProductGallery';
