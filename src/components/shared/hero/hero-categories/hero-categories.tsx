'use client';

import * as React from 'react';
import { Skeleton, Typography } from '@/components/ui';
import { CategoryIconNav } from '@/components/shared/category-icon-nav';
import { cn } from '@/utils/ui';
import type { HeroCategoriesProps } from './types';

/**
 * Heading + scrollable tile row that closes every storefront hero.
 *
 * The storefront landing shows the top-level categories under a plain
 * «دستـــــــه بندی ها»; a category landing shows that category's children and
 * puts its name in `highlight`, which renders in the primary colour — the two
 * are the same block with different data.
 */
export const HeroCategories: React.FC<HeroCategoriesProps> = ({
  title,
  highlight,
  subtitle,
  items,
  activeId,
  isLoading = false,
  skeletonCount = 8,
  className,
  titleClassName,
}) => (
  <div className={cn('w-full', className)}>
    <div className="flex flex-col items-center gap-4">
      <Typography variant="h4" className={cn('relative text-gray-900', titleClassName)}>
        {title}
        {highlight ? <span className="text-primary"> {highlight}</span> : null}
      </Typography>
      {subtitle ? (
        <Typography variant="caption-md" className="text-gray-500">
          {subtitle}
        </Typography>
      ) : null}
    </div>

    {isLoading ? (
      <div aria-hidden="true" className="no-scrollbar mt-8 flex gap-4 overflow-x-auto md:gap-6">
        {Array.from({ length: skeletonCount }, (_, index) => (
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
      <CategoryIconNav items={items} activeId={activeId} className="mt-8" />
    )}
  </div>
);

HeroCategories.displayName = 'HeroCategories';
