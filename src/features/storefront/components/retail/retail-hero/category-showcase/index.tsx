'use client';

import * as React from 'react';
import { Typography, Skeleton } from '@/components/ui';
import { CategoryIconNav, HeroObjIcon } from '@/components/shared';
import { cn } from '@/utils/ui';
import { usePopularCategories } from '@/hooks';
import {
  RETAIL_CATEGORIES_COUNT,
  RETAIL_CATEGORIES_SUBTITLE,
  RETAIL_CATEGORIES_TITLE,
} from '@/features/storefront/components/retail/constants';

export const CategoryShowcase: React.FC<{ className?: string }> = ({ className }) => {
  const categoriesQuery = usePopularCategories();
  const categories = categoriesQuery.data ?? [];

  return (
    <div className={cn('w-full', className)}>
      <div className="mt-10 flex flex-col items-center gap-4">
        <Typography variant="h4" className="relative text-gray-900">
          {RETAIL_CATEGORIES_TITLE}
          <HeroObjIcon className="absolute -top-4 left-16 size-13" />
        </Typography>
        <Typography variant="caption-md" className="text-gray-500">
          {RETAIL_CATEGORIES_SUBTITLE}
        </Typography>
      </div>

      {categoriesQuery.isLoading ? (
        <div aria-hidden="true" className="no-scrollbar mt-8 flex gap-4 overflow-x-auto md:gap-6">
          {Array.from({ length: RETAIL_CATEGORIES_COUNT }, (_, index) => (
            <div
              key={index}
              className="flex w-[80px] shrink-0 flex-col items-center gap-3 md:w-[128px]"
            >
              <Skeleton className="rounded-6 aspect-square w-full" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      ) : (
        /* Same tile row the catalog hero uses — one scrollable line, like the
           story bar. Every tile stays reachable by swiping, so the old "…more"
           truncation tile and the desktop row cap are gone. */
        <CategoryIconNav items={categories.slice(0, RETAIL_CATEGORIES_COUNT)} className="mt-8" />
      )}
    </div>
  );
};

CategoryShowcase.displayName = 'CategoryShowcase';
