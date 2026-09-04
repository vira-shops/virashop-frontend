import * as React from 'react';
import { Skeleton } from '@/components/ui';

export const StorefrontShowcaseSkeleton: React.FC = () => (
  <div
    aria-hidden="true"
    className="relative mx-auto flex max-w-4xl items-start justify-between gap-8 sm:pt-5"
  >
    {[0, 1].map((index) => (
      <div
        key={index}
        className="md:w-storefront flex w-[calc(50%-var(--spacing-2))] flex-col items-center gap-4 sm:w-[calc(50%-var(--spacing-3))] sm:gap-8"
      >
        <Skeleton className="aspect-storefront rounded-9 w-full" />
        <Skeleton className="rounded-6 h-13 w-full sm:w-45" />
      </div>
    ))}
  </div>
);

StorefrontShowcaseSkeleton.displayName = 'StorefrontShowcaseSkeleton';
