import * as React from 'react';
import { Skeleton } from '@/components/ui';

const NewsCardSkeleton: React.FC = () => (
  <div className="rounded-9 flex flex-col overflow-hidden bg-white shadow-sm">
    <Skeleton className="aspect-[400/250] w-full rounded-none" />
    <div className="flex flex-col gap-3 p-5">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="mt-1 h-4 w-24" />
    </div>
  </div>
);

export const TechNewsSkeleton: React.FC = () => (
  <section aria-hidden="true" className="container py-13">
    <div className="rounded-9 bg-gray-50 px-11 py-13">
      <div className="flex flex-col items-start gap-4">
        <Skeleton className="h-1 w-15 rounded-full" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <NewsCardSkeleton />
        <NewsCardSkeleton />
        <NewsCardSkeleton />
        <NewsCardSkeleton />
      </div>
    </div>
  </section>
);

TechNewsSkeleton.displayName = 'TechNewsSkeleton';
