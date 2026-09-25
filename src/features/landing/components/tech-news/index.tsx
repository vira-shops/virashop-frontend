'use client';

import * as React from 'react';
import { NewsCard } from '@/components/shared';
import { Typography } from '@/components/ui';
import { useTechNews } from '@/hooks';
import {
  TECH_NEWS_ARIA_LABEL,
  TECH_NEWS_DESCRIPTION,
  TECH_NEWS_READ_MORE_LABEL,
  TECH_NEWS_TITLE,
} from './constants';
import { TechNewsSkeleton } from './skeleton';
import type { TechNewsToCard } from './types';

const toNewsCardProps: TechNewsToCard = (item) => ({
  image: { src: item.image, alt: item.imageAlt },
  title: item.title,
  excerpt: item.excerpt,
  href: item.href,
  linkLabel: TECH_NEWS_READ_MORE_LABEL,
});

export const TechNews: React.FC = () => {
  const newsQuery = useTechNews();
  const news = newsQuery.data ?? [];

  if (newsQuery.isLoading) {
    return <TechNewsSkeleton />;
  }

  if (news.length === 0) {
    return null;
  }

  return (
    <section
      aria-label={TECH_NEWS_ARIA_LABEL}
      className="container max-md:mt-[56px] max-md:px-0 md:mt-18"
    >
      <div className="md:rounded-9 bg-blue-50 px-7 py-11 md:px-11 md:py-13">
        <div className="flex flex-col items-start gap-3">
          <div className="mx-auto flex w-15 gap-2 lg:mx-0">
            <div className="bg-retail-500 h-0.5 w-full rounded-full" />
            <div className="bg-wholesale-500 h-0.5 w-full rounded-full" />
          </div>

          <Typography variant="h3" className="w-full text-center text-blue-900 lg:text-right">
            {TECH_NEWS_TITLE}
          </Typography>

          <Typography variant="body-md" className="w-full text-center text-gray-700 lg:text-right">
            {TECH_NEWS_DESCRIPTION}
          </Typography>
        </div>

        {/* Phones swipe a single row of 288px cards, as drawn; from `md` up
            the cards settle into the grid. */}
        <div className="no-scrollbar -mx-7 mt-3 flex snap-x snap-mandatory gap-7 overflow-x-auto px-[36px] md:mx-0 md:mt-9 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-4">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              {...toNewsCardProps(item)}
              className="w-72 shrink-0 snap-center bg-transparent shadow-none md:w-auto"
              imageWrapperClassName="rounded-b-9"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

TechNews.displayName = 'TechNews';
