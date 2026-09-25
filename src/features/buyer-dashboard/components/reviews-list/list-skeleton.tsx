import * as React from 'react';
import { Skeleton } from '@/components/ui';
import { SKELETON_COUNT } from './constants';

export const ListSkeleton: React.FC = () => (
  <div className="flex flex-col gap-5" aria-busy="true">
    {Array.from({ length: SKELETON_COUNT }, (_, index) => (
      <Skeleton key={index} className="rounded-8 h-44 w-full" />
    ))}
  </div>
);
