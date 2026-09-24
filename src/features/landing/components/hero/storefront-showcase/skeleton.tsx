import * as React from 'react';
import { Skeleton } from '@/components/ui';

export const StorefrontShowcaseSkeleton: React.FC = () => (
  <div
    aria-hidden="true"
    className="relative mx-auto flex max-w-[752px] items-start justify-between gap-7 px-7 md:gap-11 md:px-0"
  >
    {[0, 1].map((index) => (
      <div
        key={index}
        className="md:w-storefront flex w-[calc(50%-var(--spacing-3))] flex-col items-center gap-7 md:gap-11"
      >
        <Skeleton className="aspect-storefront rounded-9 w-full" />
        <Skeleton className="rounded-6 md:w-storefront-button h-12 w-full md:h-13" />
      </div>
    ))}
  </div>
);

StorefrontShowcaseSkeleton.displayName = 'StorefrontShowcaseSkeleton';
