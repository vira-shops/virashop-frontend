'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import {
  CitySelect,
  HeroSearchBar,
  StoryBar,
  StoryBarSkeleton,
  StoryViewer,
} from '@/components/shared';
import { useCities, useActiveStories } from '@/hooks';
import { PATHS } from '@/routes/paths';
import { HeroProps } from './types';
import { HERO_GRADIENT, HERO_GRADIENT_OPACITY } from './constants';
import { StorefrontShowcase } from './storefront-showcase';

export const Hero: React.FC<HeroProps> = ({
  defaultCity,
  onCityChange,
  searchPlaceholder,
  className,
}) => {
  const citiesQuery = useCities();
  const storiesQuery = useActiveStories();

  const [open, setOpen] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState(0);

  const cities = citiesQuery.data ?? [];
  const stories = storiesQuery.data ?? [];

  const handleStoryOpen = (index: number) => {
    setStartIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // The section is sized by its content — only the gradient backdrop keeps the
  // fixed `h-hero` band. Pinning the height on the section itself left
  // `StorefrontShowcase` overflowing it, which forced every page below to
  // compensate with a magic top margin.
  return (
    <section aria-label="بخش اصلی" className={cn('relative w-full', className)}>
      <div
        className="h-hero pointer-events-none absolute inset-x-0 top-0"
        style={{ background: HERO_GRADIENT, opacity: HERO_GRADIENT_OPACITY }}
        aria-hidden="true"
      />

      <div className="relative container flex w-full flex-col items-center justify-center gap-10 py-13 sm:gap-13 md:w-4xl md:gap-13 md:py-13">
        <div className="flex w-full flex-col gap-4 sm:gap-9 md:flex-row">
          <CitySelect
            cities={cities}
            defaultValue={defaultCity}
            onChange={onCityChange}
            disabled={citiesQuery.isLoading}
          />
          <HeroSearchBar
            placeholder={searchPlaceholder}
            hrefForCategory={(slug) => PATHS.RETAIL.CATEGORY(slug)}
            hrefForSearch={(q) => `${PATHS.RETAIL.SEARCH}?q=${encodeURIComponent(q)}`}
          />
        </div>

        {storiesQuery.isLoading ? (
          <StoryBarSkeleton />
        ) : (
          <StoryBar stories={stories} onStoryOpen={handleStoryOpen} />
        )}
      </div>

      <StoryViewer items={stories} open={open} startIndex={startIndex} onClose={handleClose} />

      <StorefrontShowcase />
    </section>
  );
};

Hero.displayName = 'Hero';
