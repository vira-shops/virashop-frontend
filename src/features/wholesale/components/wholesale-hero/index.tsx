'use client';

import * as React from 'react';
import { StoryViewer } from '@/components/shared';
import { useActiveStories, useCities } from '@/hooks';
import { CitySelect } from '@/features/landing/components/hero/city-select';
import { SearchBar } from '@/features/landing/components/hero/search-bar';
import { StoryBar, StoryBarSkeleton } from '@/features/landing/components/hero/story-bar';
import { cn } from '@/utils/ui';
import {
  WHOLESALE_HERO_ARIA_LABEL,
  WHOLESALE_HERO_SEARCH_PLACEHOLDER,
} from '@/features/wholesale/constants';

export const WholesaleHero: React.FC<{ className?: string }> = ({ className }) => {
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
    <section aria-label={WHOLESALE_HERO_ARIA_LABEL} className={cn('relative w-full', className)}>
      <div className="container flex w-full flex-col items-center gap-12 pt-13 pb-4">
        <div className="flex w-full flex-col gap-4 sm:gap-9 md:flex-row">
          <CitySelect cities={cities} disabled={citiesQuery.isLoading} aria-label="?????? ???" />
          <SearchBar onChange={() => undefined} placeholder={WHOLESALE_HERO_SEARCH_PLACEHOLDER} />
        </div>

        {storiesQuery.isLoading ? (
          <StoryBarSkeleton />
        ) : (
          <StoryBar stories={stories} onStoryOpen={handleStoryOpen} />
        )}
      </div>

      <StoryViewer items={stories} open={open} startIndex={startIndex} onClose={handleClose} />
    </section>
  );
};

WholesaleHero.displayName = 'WholesaleHero';
