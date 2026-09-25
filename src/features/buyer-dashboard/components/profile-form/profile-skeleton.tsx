import * as React from 'react';
import { Skeleton } from '@/components/ui';
import { PROFILE_GRID_CLASS } from './constants';

export const ProfileSkeleton: React.FC = () => (
  <div className={PROFILE_GRID_CLASS} aria-busy="true">
    <Skeleton className="rounded-8 h-[36rem]" />
    <Skeleton className="rounded-8 h-[36rem] max-lg:hidden" />
  </div>
);
