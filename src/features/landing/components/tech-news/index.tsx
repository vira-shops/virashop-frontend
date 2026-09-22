'use client';

import * as React from 'react';
import { NewsCard } from '@/components/shared';
import { Typography } from '@/components/ui';
import { useTechNews } from '@/hooks';
import type { TechNewsItem } from '@/contracts/endpoints/posts/schemas';
import {
  TECH_NEWS_ARIA_LABEL,
  TECH_NEWS_DESCRIPTION,
  TECH_NEWS_READ_MORE_LABEL,
  TECH_NEWS_TITLE,
} from './constants';
import { TechNewsSkeleton } from './skeleton';

const toNewsCardProps = (item: TechNewsItem) => ({
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
    <section aria-label={TECH_NEWS_ARIA_LABEL} className="container">
      <div className="rounded-9 bg-blue-50 px-11 py-13">
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

        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              {...toNewsCardProps(item)}
              className="bg-transparent shadow-none"
              imageWrapperClassName="rounded-b-9"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

TechNews.displayName = 'TechNews';
