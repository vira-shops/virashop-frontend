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
import { HeroProps } from './types';
import { HERO_GRADIENT, HERO_GRADIENT_OPACITY } from './constants';
import { StorefrontShowcase } from './storefront-showcase';

export const Hero: React.FC<HeroProps> = ({
  defaultCity,
  onCityChange,
  onSearch,
  showCitySelect = true,
  showStorefront = true,
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

  return (
    <section aria-label="بخش اصلی" className={cn('h-hero relative w-full', className)}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: HERO_GRADIENT, opacity: HERO_GRADIENT_OPACITY }}
        aria-hidden="true"
      />

      <div className="relative container flex w-full flex-col items-center justify-center gap-10 py-13 sm:gap-13 md:w-4xl md:gap-13 md:py-13">
        <div className="flex w-full flex-col gap-4 sm:gap-9 md:flex-row">
          {showCitySelect && (
            <CitySelect
              cities={cities}
              defaultValue={defaultCity}
              onChange={onCityChange}
              disabled={citiesQuery.isLoading}
            />
          )}
          <HeroSearchBar onChange={onSearch} placeholder={searchPlaceholder} />
        </div>

        {storiesQuery.isLoading ? (
          <StoryBarSkeleton />
        ) : (
          <StoryBar stories={stories} onStoryOpen={handleStoryOpen} />
        )}
      </div>

      <StoryViewer items={stories} open={open} startIndex={startIndex} onClose={handleClose} />

      {showStorefront && <StorefrontShowcase />}
    </section>
  );
};

Hero.displayName = 'Hero';
