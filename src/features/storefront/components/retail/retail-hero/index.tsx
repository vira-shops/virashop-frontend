'use client';

import * as React from 'react';
import { DownArrowIcon } from '@icons';
import {
  HeroCategories,
  HeroSearchBar,
  StoryBar,
  StoryBarSkeleton,
  StoryViewer,
} from '@/components/shared';
import { Button } from '@/components/ui';
import { useActiveStories, useStorefrontHeroCategories } from '@/hooks';
import { PATHS } from '@/routes/paths';
import { RETAIL_NEXT_SECTION_ID } from '@/features/storefront/components/retail/constants';
import {
  RETAIL_HERO_ARIA_LABEL,
  RETAIL_HERO_ID,
  RETAIL_HERO_SEARCH_PLACEHOLDER,
  SCROLL_NEXT_BUTTON_CLASS,
  SCROLL_NEXT_LABEL,
} from './constants';
import type { RetailHeroProps } from './types';

export type { RetailHeroProps } from './types';

export const RetailHero: React.FC<RetailHeroProps> = ({ categorySlug }) => {
  const storiesQuery = useActiveStories();
  const heroCategories = useStorefrontHeroCategories('RETAIL', categorySlug);

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
    <section id={RETAIL_HERO_ID} aria-label={RETAIL_HERO_ARIA_LABEL} className="relative w-full">
      <div className="bg-retail-tint pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-[808px] flex-col items-center gap-[28px] px-7 pt-11 pb-13 md:box-content md:gap-13 md:pt-13">
        <HeroSearchBar
          placeholder={RETAIL_HERO_SEARCH_PLACEHOLDER}
          hrefForCategory={(slug) => PATHS.RETAIL.CATEGORY_PRODUCTS(slug)}
          hrefForSearch={(q) => `${PATHS.RETAIL.SEARCH}?q=${encodeURIComponent(q)}`}
        />
        {storiesQuery.isLoading ? (
          <StoryBarSkeleton />
        ) : (
          <StoryBar stories={stories} onStoryOpen={handleStoryOpen} />
        )}
        <HeroCategories {...heroCategories} />
      </div>

      <StoryViewer items={stories} open={open} startIndex={startIndex} onClose={handleClose} />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center">
        <Button
          variant="fill"
          onClick={scrollNext}
          aria-label={SCROLL_NEXT_LABEL}
          icon={<DownArrowIcon className="size-7 -rotate-45 text-yellow-100" aria-hidden="true" />}
          className={SCROLL_NEXT_BUTTON_CLASS}
        />
      </div>
    </section>
  );
};

RetailHero.displayName = 'RetailHero';
