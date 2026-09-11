'use client';

import * as React from 'react';
import { DownArrowIcon } from '@icons';
import { StoryViewer } from '@/components/shared';
import { cn } from '@/utils/ui';
import { useActiveStories } from '@/hooks';
import { SearchBar } from '@/features/landing/components/hero/search-bar';
import { StoryBar, StoryBarSkeleton } from '@/features/landing/components/hero/story-bar';
import { CategoryShowcase } from './category-showcase';
import {
  RETAIL_HERO_SEARCH_PLACEHOLDER,
  RETAIL_NEXT_SECTION_ID,
} from '@/features/retail/constants';
import { Button } from '@/components/ui';

export const RetailHero: React.FC = () => {
  const storiesQuery = useActiveStories();

  const [open, setOpen] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState(0);

  const stories = storiesQuery.data ?? [];

  const handleStoryOpen = (index: number) => {
    setStartIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const scrollNext = () => {
    document
      .getElementById(RETAIL_NEXT_SECTION_ID)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="retail-hero"
      aria-label="??? ???? ???????"
      className="relative mb-16 w-full md:mb-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#FFF9ED]" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-10 px-5 pt-13 pb-20 md:px-0">
        <SearchBar onChange={() => undefined} placeholder={RETAIL_HERO_SEARCH_PLACEHOLDER} />
        {storiesQuery.isLoading ? (
          <StoryBarSkeleton />
        ) : (
          <StoryBar stories={stories} onStoryOpen={handleStoryOpen} />
        )}
        <CategoryShowcase />
      </div>

      <StoryViewer items={stories} open={open} startIndex={startIndex} onClose={handleClose} />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center">
        <Button
          type="button"
          variant="fill"
          onClick={scrollNext}
          aria-label="??? ?? ???? ????"
          icon={<DownArrowIcon className="size-7 -rotate-45 text-yellow-100" aria-hidden="true" />}
          className={cn(
            'pointer-events-auto flex translate-y-1/3 items-center justify-center',
            'rounded-10 size-14 rotate-45 bg-[#FFF9ED]',
            '-z-50 transition-transform hover:scale-105',
          )}
        />
      </div>
    </section>
  );
};

RetailHero.displayName = 'RetailHero';
