'use client';

import * as React from 'react';
import type { FC, SVGProps } from 'react';
import { Skeleton, Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import type { CategoryShowcaseProps } from './types';

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

const gradientFor = (index: number): string => CARD_GRADIENTS[index % CARD_GRADIENTS.length];

const DEFAULT_GRID_CLASS = 'grid grid-cols-3 gap-6 md:grid-cols-6 lg:grid-cols-7';

/** One gradient icon-tile (80×80 mobile / 128×128 desktop) with title below. */
const CategoryTile: React.FC<{
  title: string;
  href?: string;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  gradient: string;
}> = ({ title, href, Icon, gradient }) => (
  <a href={href ?? '#'} className="group flex w-full flex-col items-center">
    <div
      className={cn(
        'rounded-9 flex h-16 w-16 items-center justify-center shadow-sm',
        'transition-all group-hover:scale-105 group-hover:shadow-md lg:h-32 lg:w-32',
        gradient,
      )}
    >
      {Icon && <Icon className="h-10 w-10 text-white lg:h-16 lg:w-16" aria-hidden="true" />}
    </div>
    <Typography
      variant="caption-lg"
      className="group-hover:text-primary-500 mt-3 text-center text-gray-700 transition-colors"
    >
      {title}
    </Typography>
  </a>
);

/**
 * Reusable gradient icon-tile category showcase — fully content-agnostic:
 * title/subtitle/tiles/icons all come in as props, the caller owns data
 * fetching (see the wholesale feature for the wiring example).
 */
export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  title,
  subtitle,
  items,
  soonLabel,
  iconMap,
  fallbackIcon,
  isLoading = false,
  skeletonCount = 7,
  id,
  className,
  gridClassName,
}) => {
  const iconFor = (iconKey?: string): FC<SVGProps<SVGSVGElement>> | undefined =>
    (iconKey ? iconMap?.[iconKey] : undefined) ?? fallbackIcon;

  return (
    <section id={id} aria-label={title} className={cn('w-full', className)}>
      <div className="container flex flex-col items-center gap-1">
        <Typography variant="h4" className="text-gray-900">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption-md" className="text-gray-500">
            {subtitle}
          </Typography>
        )}
      </div>

      {isLoading ? (
        <div aria-hidden="true" className="container flex flex-col gap-8">
          {soonLabel && (
            <div className="flex items-center gap-6">
              <Skeleton className="rounded-9 h-20 w-20 lg:h-32 lg:w-32" />
              <Skeleton className="h-1 w-full" />
            </div>
          )}
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-5 lg:flex lg:flex-wrap lg:justify-center lg:gap-x-10">
            {Array.from({ length: skeletonCount }, (_, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <Skeleton className="rounded-9 h-20 w-20 lg:h-32 lg:w-32" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container flex flex-col gap-8">
          {/* Detached first tile with its dashed strip (e.g. «بزودی») */}
          {soonLabel && items[0] && (
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 shrink-0 lg:w-32">
                <CategoryTile
                  title={items[0].title}
                  href={items[0].href}
                  Icon={iconFor(items[0].iconKey)}
                  gradient={gradientFor(0)}
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary-500 border-primary-500/60 flex h-px w-full border-t-2 border-dashed" />
                <Typography variant="body-md" className="text-primary-600" aria-hidden="true">
                  {soonLabel}
                </Typography>
              </div>
            </div>
          )}

          {/* Grid tiles — everything after the detached first item */}
          <div className={cn(DEFAULT_GRID_CLASS, gridClassName)}>
            {(soonLabel ? items.slice(1) : items).map((item, index) => (
              <CategoryTile
                key={item.id}
                title={item.title}
                href={item.href}
                Icon={iconFor(item.iconKey)}
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
