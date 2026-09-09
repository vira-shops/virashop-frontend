'use client';

import * as React from 'react';
import { Skeleton, Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import type { FC, SVGProps } from 'react';
import { BottleIcon, CackeIcon, CheeseIcon, FishIcon, LeafIcon } from '@icons';
import { usePopularCategories } from '@/features/landing/hooks';
import {
  WHOLESALE_CATEGORIES_SECTION_ID,
  WHOLESALE_CATEGORIES_SOON_LABEL,
  WHOLESALE_CATEGORIES_SUBTITLE,
  WHOLESALE_CATEGORIES_TITLE,
} from '@/features/wholesale/constants';

/**
 * Project gradient utilities (tailwind.css) — cycled across category tiles:
 * 80×80 on mobile, 128×128 on desktop, icon-centered (no images).
 */
const CARD_GRADIENTS = [
  'gradient-sky',
  'gradient-violet',
  'gradient-fuchsia',
  'gradient-purple',
  'gradient-rose',
  'gradient-coral',
  'gradient-orange',
  'gradient-yellow',
  'gradient-green',
] as const;

const CATEGORY_ICONS: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  food: BottleIcon,
  protein: FishIcon,
  dairy: CackeIcon,
  snacks: CheeseIcon,
  beverages: BottleIcon,
  detergents: LeafIcon,
  fruits: LeafIcon,
  sweets: CackeIcon,
};

const gradientFor = (index: number): string => CARD_GRADIENTS[index % CARD_GRADIENTS.length];

/** One gradient icon-tile (80×80 mobile / 128×128 desktop) with title below. */
const CategoryTile: React.FC<{
  title: string;
  slug: string;
  href?: string;
  gradient: string;
}> = ({ title, slug, href, gradient }) => {
  const Icon = CATEGORY_ICONS[slug] ?? BottleIcon;

  return (
    <a href={href ?? '#'} className="group flex w-full flex-col items-center">
      <div
        className={cn(
          'rounded-9 flex h-16 w-16 items-center justify-center shadow-sm',
          'transition-all group-hover:scale-105 group-hover:shadow-md lg:h-32 lg:w-32',
          gradient,
        )}
      >
        <Icon className="h-10 w-10 text-white lg:h-16 lg:w-16" aria-hidden="true" />
      </div>
      <Typography
        variant="caption-lg"
        className="group-hover:text-primary-500 mt-3 text-center text-gray-700 transition-colors"
      >
        {title}
      </Typography>
    </a>
  );
};

export const CategoryShowcase: React.FC<{ className?: string }> = ({ className }) => {
  const categoriesQuery = usePopularCategories();
  const categories = categoriesQuery.data ?? [];

  const [food, ...rest] = categories;
  const gridCategories = rest.slice(0, 7);

  return (
    <section
      id={WHOLESALE_CATEGORIES_SECTION_ID}
      aria-label={WHOLESALE_CATEGORIES_TITLE}
      className={cn('w-full', className)}
    >
      <div className="container flex flex-col items-center gap-1 py-10">
        <Typography variant="h4" className="text-gray-900">
          {WHOLESALE_CATEGORIES_TITLE}
        </Typography>
        <Typography variant="caption-md" className="text-gray-500">
          {WHOLESALE_CATEGORIES_SUBTITLE}
        </Typography>
      </div>

      {categoriesQuery.isLoading ? (
        <div aria-hidden="true" className="container flex flex-col gap-8">
          <div className="flex items-center gap-6">
            <Skeleton className="rounded-9 h-20 w-20 lg:h-32 lg:w-32" />
            <Skeleton className="h-1 w-full" />
          </div>
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-5 lg:flex lg:flex-wrap lg:justify-center lg:gap-x-10">
            {Array.from({ length: 7 }, (_, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <Skeleton className="rounded-9 h-20 w-20 lg:h-32 lg:w-32" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container flex flex-col gap-8">
          {/* Detached first category (مواد غذایی) with its dashed "بزودی" strip */}
          {food && (
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 shrink-0 lg:w-32">
                <CategoryTile
                  title={food.title}
                  slug={food.slug}
                  href={food.href}
                  gradient={gradientFor(0)}
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary-500 border-primary-500/60 flex h-px w-full border-t-2 border-dashed"></div>
                <div aria-hidden="true" className="items-center">
                  <Typography variant="body-md" className="text-primary-600">
                    {WHOLESALE_CATEGORIES_SOON_LABEL}
                  </Typography>
                </div>
              </div>
            </div>
          )}

          {/* Remaining categories — identical layout on mobile and desktop */}
          <div className="grid grid-cols-3 gap-6 md:grid-cols-6 lg:grid-cols-7">
            {gridCategories.map((category, index) => (
              <CategoryTile
                key={category.id}
                title={category.title}
                slug={category.slug}
                href={category.href}
                gradient={gradientFor(index + 1)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

CategoryShowcase.displayName = 'CategoryShowcase';
