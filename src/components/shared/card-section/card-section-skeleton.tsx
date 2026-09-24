import * as React from 'react';
import { Skeleton } from '@/components/ui';
import { cn } from '@/utils/ui';

const ProductCardSkeleton: React.FC = () => (
  <div className="w-product-card shrink-0">
    <div className="rounded-9 bg-white shadow-sm">
      <Skeleton className="aspect-product-card rounded-t-9 w-full" />
      <div className="flex flex-col gap-5 p-5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="rounded-8 h-12 w-full" />
      </div>
    </div>
  </div>
);

export interface CardSectionSkeletonProps {
  count?: number;
  className?: string;
}

/** Loading placeholder mirroring CardSection. */
export const CardSectionSkeleton: React.FC<CardSectionSkeletonProps> = ({
  count = 4,
  className,
}) => (
  <section aria-hidden="true" className={cn(className)}>
    <div className="container">
      <div className="mb-11 flex w-full items-end justify-between">
        <div className="flex flex-col items-start gap-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="rounded-8 h-11 w-24" />
      </div>

      <div className="flex gap-11 overflow-hidden">
        {Array.from({ length: count }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </section>
);

CardSectionSkeleton.displayName = 'CardSectionSkeleton';
