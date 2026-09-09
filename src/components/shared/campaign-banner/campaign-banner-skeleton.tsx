import * as React from 'react';
import { Skeleton } from '@/components/ui';
import { cn } from '@/utils/ui';

/** Loading placeholder matching the CampaignBanner layout. */
export const CampaignBannerSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div aria-hidden="true" className={cn('bg-primary-500 w-full', className)}>
    <div className="container flex flex-col gap-8 py-10 lg:flex-row lg:items-center">
      <div className="lg:w-[72%] lg:shrink-0">
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="w-product-card rounded-6 h-72 shrink-0" />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-6 lg:items-start">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="rounded-3 h-14 w-52" />
        <Skeleton className="rounded-3 h-11 w-32" />
      </div>
    </div>
  </div>
);

CampaignBannerSkeleton.displayName = 'CampaignBannerSkeleton';
