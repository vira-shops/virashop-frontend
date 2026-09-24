'use client';

import * as React from 'react';
import Link from 'next/link';
import { NotificationIcon } from '@icons';
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  Typography,
  type CarouselApi,
} from '@/components/ui';
import { cn } from '@/utils/ui';
import type { AnnouncementCarouselProps } from './types';

export const AnnouncementCarousel: React.FC<AnnouncementCarouselProps> = ({
  items,
  linkLabel = 'مشاهده جزئیات',
  autoplayMs = 6000,
  className,
  slideClassName,
  illustrationClassName,
  dotsClassName,
}) => {
  const [api, setApi] = React.useState<CarouselApi | null>(null);

  React.useEffect(() => {
    if (!api || autoplayMs <= 0 || items.length < 2) return;

    const timer = window.setInterval(() => {
      api.scrollTo((api.selectedScrollSnap() + 1) % items.length);
    }, autoplayMs);

    return () => window.clearInterval(timer);
  }, [api, autoplayMs, items.length]);

  if (items.length === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="اطلاعیه‌ها"
      className={cn('w-full', className)}
    >
      {/* Zero the viewport's default padding so the neighbouring slide never peeks in. */}
      <Carousel
        setApi={setApi}
        opts={{ loop: items.length > 1 }}
        className="w-full [&_.carousel-viewport]:p-0"
      >
        <CarouselContent className="p-0!">
          {items.map((item) => (
            <CarouselItem key={item.id} className="basis-full">
              <article
                className={cn(
                  'rounded-8 flex min-h-36 items-center justify-between gap-9 bg-blue-900 p-9 text-white',
                  slideClassName,
                )}
              >
                <div className="flex min-w-0 flex-col gap-4">
                  <Typography variant="h5" as="h2" className="text-white">
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body-sm"
                    as="p"
                    className="line-clamp-2 leading-8 text-white/90"
                  >
                    {item.body}
                  </Typography>
                  {item.href && (
                    <Link
                      href={item.href}
                      className="text-caption-md w-fit text-blue-300 transition-colors hover:text-white"
                    >
                      {linkLabel}
                    </Link>
                  )}
                </div>
                <NotificationIcon
                  aria-hidden="true"
                  className={cn('size-20 shrink-0 text-white/80', illustrationClassName)}
                />
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
        {items.length > 1 && (
          <CarouselIndicator
            className={cn(
              'mt-5 justify-center [&_.carousel-indicator]:bg-blue-200 [&_.carousel-indicator-active]:bg-blue-900',
              dotsClassName,
            )}
          />
        )}
      </Carousel>
    </section>
  );
};

AnnouncementCarousel.displayName = 'AnnouncementCarousel';
