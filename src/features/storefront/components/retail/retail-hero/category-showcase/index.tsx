'use client';

import * as React from 'react';
import { Typography, Skeleton } from '@/components/ui';
import { CategoryCard, HeroObjIcon } from '@/components/shared';
import { cn } from '@/utils/ui';
import { usePopularCategories } from '@/hooks';
import {
  RETAIL_CATEGORIES_MORE_LABEL,
  RETAIL_CATEGORIES_MOBILE_COUNT,
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
        <div aria-hidden="true" className="grid grid-cols-4 gap-4">
          {Array.from({ length: RETAIL_CATEGORIES_MOBILE_COUNT }, (_, index) => (
            <div
              key={index}
              className={cn('flex flex-col items-center gap-3', index >= 4 && 'lg:hidden')}
            >
              <Skeleton className="rounded-6 aspect-square w-full" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-4 gap-y-12 sm:gap-4">
          {categories.slice(0, RETAIL_CATEGORIES_MOBILE_COUNT).map((category, index) => (
            <div key={category.id} className={cn('contents', index >= 4 && 'lg:hidden')}>
              <CategoryCard
                title={category.title}
                image={category.image}
                imageAlt={category.imageAlt}
                href={category.href}
                moreLabel={
                  index === RETAIL_CATEGORIES_MOBILE_COUNT - 1
                    ? RETAIL_CATEGORIES_MORE_LABEL
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CategoryShowcase.displayName = 'CategoryShowcase';
