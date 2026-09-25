import * as React from 'react';
import { Skeleton } from '@/components/ui';
import { DETAILS_CARD_CLASS, SKELETON_SECTION_COUNT } from './constants';

export const DetailsSkeleton: React.FC = () => (
  <div className={DETAILS_CARD_CLASS} aria-busy="true">
    {Array.from({ length: SKELETON_SECTION_COUNT }, (_, index) => (
      <div key={index} className="flex flex-col gap-5">
        <Skeleton className="h-11 w-full rounded-full" />
        <Skeleton className="rounded-4 h-20 w-full" />
      </div>
    ))}
  </div>
);
