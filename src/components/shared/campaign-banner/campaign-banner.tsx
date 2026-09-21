'use client';

import * as React from 'react';
import { Button, Typography } from '@/components/ui';
import { ProductCard } from '@/components/shared/product-card';
import { cn } from '@/utils/ui';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui';
import { useCountdown, toFaDigits } from './use-countdown';
import type { CampaignBannerProps } from './types';
import { DownArrowIcon } from '@icons';

/**
 * Splits a plain-string title into its lead segment and the emphasized
 * (black) rest, at the first space or ZWNJ (نیم‌فاصله) boundary — e.g.
 * "تخفیف بزرگ" → "تخفیف" + " بزرگ", "پرفروش‌ترین‌ها" → "پرفروش" + "‌ترین‌ها".
 * A single-word title (no boundary) renders unemphasized.
 */
const splitTitleEmphasis = (title: string): { lead: string; rest: string } => {
  const boundaryIndex = title.search(/[\s‌]/);

  if (boundaryIndex === -1) {
    return { lead: title, rest: '' };
  }

  return { lead: title.slice(0, boundaryIndex), rest: title.slice(boundaryIndex) };
};

const TimeCell: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex min-w-14 flex-col items-center gap-0.5">
    <div className="rounded-3 flex h-13.5 w-13.5 items-center justify-center bg-white">
      <Typography variant="h3" color="primary" dir="ltr">
        {toFaDigits(value)}
      </Typography>
    </div>
    <Typography variant="body-xs" color="white">
      {label}
    </Typography>
  </div>
);

export const CampaignBanner: React.FC<CampaignBannerProps> = ({
  title,
  subtitle,
  endsAt,
  items,
  viewAll,
  id,
  className,
}) => {
  const { days, hours, minutes, ended } = useCountdown(endsAt);
  const titleParts = typeof title === 'string' ? splitTitleEmphasis(title) : null;

  if (items.length === 0) {
    return null;
  }

  const viewAllButton = !viewAll ? null : viewAll.href ? (
    <Button
      variant="fill"
      color="primary"
      size="md"
      href={viewAll.href}
      leftIcon={<DownArrowIcon className="rotate-90" />}
      className="text-primary-500 bg-white shadow-md hover:bg-white/90 md:w-full"
    >
      {viewAll.label ?? 'مشاهده همه'}
    </Button>
  ) : (
    <Button
      variant="fill"
      color="primary"
      size="md"
      onClick={viewAll.onClick}
      className="text-primary-700 bg-white shadow-md hover:bg-white/90 md:w-full"
    >
      {viewAll.label ?? 'مشاهده همه'}
    </Button>
  );

  return (
    <section id={id} aria-label="کمپین تخفیف" className={cn('bg-primary-500 w-full', className)}>
      <div className="container flex flex-col items-center justify-between gap-8 py-10 lg:flex-row lg:items-start">
        {/* Campaign info */}
        <div className="flex flex-col items-center">
          <div className="flex h-full flex-col items-center gap-1">
            <Typography variant="h2" className="text-white">
              {titleParts ? (
                <>
                  {titleParts.lead}
                  {titleParts.rest && <span className="text-black">{titleParts.rest}</span>}
                </>
              ) : (
                title
              )}
            </Typography>
            {subtitle && (
              <Typography variant="body-xs" className="text-white">
                {subtitle}
              </Typography>
            )}
            {!ended ? (
              <div className="mt-8 mb-8 flex items-center gap-2 md:mb-34" dir="ltr">
                <TimeCell value={days} label="روز" />
                <Typography variant="h1" className="mb-10 text-white">
                  :
                </Typography>
                <TimeCell value={hours} label="ساعت" />
                <Typography variant="h1" className="mb-10 text-white">
                  :
                </Typography>
                <TimeCell value={minutes} label="دقیقه" />
              </div>
            ) : (
              <Typography variant="body-sm" className="text-white">
                این کمپین به پایان رسیده است
              </Typography>
            )}
          </div>

          <div className="hidden md:block">{viewAllButton}</div>
        </div>

        <div className="w-full lg:w-[72%] lg:shrink-0">
          {/* Product cards in a swipeable carousel — draggable, loop disabled,
              no arrows; overflow never leaves the banner's own width. */}
          <Carousel opts={{ loop: false, containScroll: 'trimSnaps' }} className="w-full">
            <CarouselContent className="no-scrollbar ml-0 gap-4">
              {items.map(({ id: itemId, ...item }, index) => (
                <CarouselItem
                  key={itemId ?? `campaign-item-${index}`}
                  className="w-product-card basis-auto pl-0"
                >
                  <ProductCard {...item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="block md:hidden">{viewAllButton}</div>
      </div>
    </section>
  );
};

CampaignBanner.displayName = 'CampaignBanner';
