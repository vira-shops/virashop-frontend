import * as React from 'react';
import { Skeleton } from '@/components/ui';

const STORY_SKELETON_COUNT = 5;

export const StoryBarSkeleton: React.FC = () => (
  <div aria-hidden="true" className="flex w-full items-center overflow-x-auto">
    <div className="mx-auto flex items-center gap-11 px-11">
      {Array.from({ length: STORY_SKELETON_COUNT }, (_, index) => (
        <div key={index} className="flex shrink-0 flex-col items-center gap-2">
          <Skeleton className="size-16 rounded-full" />
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  </div>
);

StoryBarSkeleton.displayName = 'StoryBarSkeleton';
