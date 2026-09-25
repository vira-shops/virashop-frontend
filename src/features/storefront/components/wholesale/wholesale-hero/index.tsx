'use client';

import * as React from 'react';
import {
  CitySelect,
  HeroCategories,
  HeroSearchBar,
  StoryBar,
  StoryBarSkeleton,
  StoryViewer,
} from '@/components/shared';
import { useActiveStories, useCities, useStorefrontHeroCategories } from '@/hooks';
import { cn } from '@/utils/ui';
import { PATHS } from '@/routes/paths';
import { WHOLESALE_HERO_ARIA_LABEL, WHOLESALE_HERO_SEARCH_PLACEHOLDER } from './constants';
import type { WholesaleHeroProps } from './types';

export type { WholesaleHeroProps } from './types';

export const WholesaleHero: React.FC<WholesaleHeroProps> = ({ className, categorySlug }) => {
  const citiesQuery = useCities();
  const heroCategories = useStorefrontHeroCategories('WHOLESALE', categorySlug);
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
      <div className="mx-auto max-w-4xl pt-13 pb-4">
        <div className="container flex flex-col items-center gap-12">
          <div className="flex w-full flex-col gap-4 sm:gap-9 md:flex-row">
            <CitySelect cities={cities} disabled={citiesQuery.isLoading} />
            <HeroSearchBar
              placeholder={WHOLESALE_HERO_SEARCH_PLACEHOLDER}
              hrefForCategory={(slug) => PATHS.WHOLESALE.CATEGORY_PRODUCTS(slug)}
              hrefForSearch={(q) => `${PATHS.WHOLESALE.SEARCH}?q=${encodeURIComponent(q)}`}
            />
          </div>

          {storiesQuery.isLoading ? (
            <StoryBarSkeleton />
          ) : (
            <StoryBar stories={stories} onStoryOpen={handleStoryOpen} />
          )}

          {/* Only a category landing names a category; the storefront landing
              keeps its gradient showcase section below the hero instead. */}
          {categorySlug ? <HeroCategories {...heroCategories} /> : null}
        </div>

        <StoryViewer items={stories} open={open} startIndex={startIndex} onClose={handleClose} />
      </div>
    </section>
  );
};

WholesaleHero.displayName = 'WholesaleHero';
