'use client';

import * as React from 'react';
import { Button, Typography } from '@/components/ui';
import { ProductCard } from '@/components/shared/product-card';
import { cn } from '@/utils/ui';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui';
import { useCountdown, toFaDigits } from './use-countdown';
import { splitTitleEmphasis } from '@/utils/format';
import type { CampaignBannerProps } from './types';
import { DownArrowIcon } from '@icons';

/**
 * One countdown box. On phones the box shrinks and its unit caption moves to
 * the accessibility tree so the strip reads as `۱۸ : ۵۲ : ۳۸` on one line
 * beside the headline; from `md` up the caption is visible again.
 */
const TimeCell: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex min-w-11 flex-col items-center gap-0.5 md:min-w-14">
    <div className="rounded-3 flex h-11 w-11 items-center justify-center bg-white md:h-13.5 md:w-13.5">
      <Typography variant="h3" color="primary" dir="ltr">
        {toFaDigits(value)}
      </Typography>
    </div>
    <Typography variant="body-xs" color="white" className="max-md:sr-only">
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
  // See `ProductGrid` — keeps the cards aligned when only some carry badges.
  const reserveBadgeRow = items.some((item) => item.startBadge || item.endBadge);

  if (items.length === 0) {
    return null;
  }

  const viewAllLabel = viewAll?.label ?? 'مشاهده همه';

  const viewAllButton = !viewAll ? null : viewAll.href ? (
    <Button
      variant="fill"
      color="primary"
      size="md"
      href={viewAll.href}
      leftIcon={<DownArrowIcon className="rotate-90" />}
      className="text-primary-500 bg-white shadow-md hover:bg-white/90 md:w-full"
    >
      {viewAllLabel}
    </Button>
  ) : (
    <Button
      variant="fill"
      color="primary"
      size="md"
      onClick={viewAll.onClick}
      className="text-primary-700 bg-white shadow-md hover:bg-white/90 md:w-full"
    >
      {viewAllLabel}
    </Button>
  );

  /*
    Phone-sized twin of the action: a text link that rides in the header row
    instead of a full-width button under the cards, so the band keeps the
    compact "one header line + one card row" shape.
  */
  const compactViewAll = !viewAll ? null : (
    <Button
      variant="ghost"
      color="primary"
      size="xs"
      href={viewAll.href}
      onClick={viewAll.href ? undefined : viewAll.onClick}
      leftIcon={<DownArrowIcon className="rotate-90" />}
      className="shrink-0 gap-0.5 px-0 whitespace-nowrap text-white hover:bg-transparent"
    >
      همه
    </Button>
  );

  return (
    <section id={id} aria-label="کمپین تخفیف" className={cn('bg-primary-500 w-full', className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:gap-8 md:py-10 lg:flex-row lg:items-start">
        {/* Campaign info */}
        <div className="flex w-full flex-col items-center md:w-auto">
          {/*
            Phones get the whole campaign head on ONE line — headline,
            countdown, view-all — so the band stays a strip above the card row
            instead of filling a short screen (iPhone 5/SE is 320x568). From
            `md` up it stacks back into the original column.
          */}
          <div className="flex w-full flex-row items-center justify-between gap-2 md:h-full md:w-auto md:flex-col md:justify-start md:gap-1">
            <div className="flex min-w-0 flex-col items-start gap-1 md:items-center">
              {/* `text-h4` is the same design-system scale, one step down —
                  the composition picks the step that fits a phone header. */}
              <Typography variant="h2" className="max-md:text-h4 text-white max-md:truncate">
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
                <Typography variant="body-xs" className="text-white max-md:hidden">
                  {subtitle}
                </Typography>
              )}
            </div>

            {!ended ? (
              <div
                className="flex shrink-0 items-center gap-0.5 md:mt-8 md:mb-34 md:gap-2"
                dir="ltr"
              >
                <TimeCell value={days} label="روز" />
                <Typography variant="h3" className="md:text-h1 text-white md:mb-10">
                  :
                </Typography>
                <TimeCell value={hours} label="ساعت" />
                <Typography variant="h3" className="md:text-h1 text-white md:mb-10">
                  :
                </Typography>
                <TimeCell value={minutes} label="دقیقه" />
              </div>
            ) : (
              <Typography variant="body-sm" className="shrink-0 text-white">
                این کمپین به پایان رسیده است
              </Typography>
            )}

            <div className="md:hidden">{compactViewAll}</div>
          </div>

          <div className="hidden md:block">{viewAllButton}</div>
        </div>

        <div className="w-full lg:w-[72%] lg:shrink-0">
          {/* Product cards in a swipeable carousel — draggable, loop disabled,
              no arrows; overflow never leaves the banner's own width. */}
          <Carousel
            opts={{ loop: false, containScroll: 'trimSnaps' }}
            className="w-full [&_.carousel-viewport]:py-1 md:[&_.carousel-viewport]:py-3"
          >
            <CarouselContent className="no-scrollbar me-0 gap-3 md:gap-4">
              {items.map(({ id: itemId, ...item }, index) => (
                <CarouselItem
                  key={itemId ?? `campaign-item-${index}`}
                  className="sm:w-product-card w-36 basis-auto ps-0"
                >
                  {/*
                    The slide owns the width — phones get a narrow card so the
                    whole band stays a strip and the next card peeks in.
                    `w-full!` outranks the card's own `w-product-card`, which
                    twMerge cannot fold into a plain `w-*` utility.

                    At 144px the two top badges cannot sit side by side, so the
                    badge row is dropped on phones (the reference design has no
                    top badges either) and the price/action rows get their
                    desktop gaps and pill padding trimmed.
                  */}
                  <ProductCard
                    reserveBadgeRow={reserveBadgeRow}
                    className="w-full!"
                    headerClassName="max-md:hidden"
                    contentClassName="max-md:gap-2 max-md:px-2 max-md:pb-3"
                    titleClassName="max-md:text-body-xs"
                    priceRowClassName="max-md:gap-2"
                    priceClassName="max-md:text-body-sm"
                    priceCurrencyClassName="max-md:text-overline-sm"
                    actionRowClassName="max-md:gap-2"
                    stockNoteClassName="max-md:px-2 max-md:py-0.5 max-md:whitespace-nowrap"
                    actionClassName="max-md:h-[28px]! max-md:min-w-0! max-md:px-3 max-md:text-caption-md"
                    {...item}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

CampaignBanner.displayName = 'CampaignBanner';
