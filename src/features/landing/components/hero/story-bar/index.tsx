'use client';

import * as React from 'react';
import { StoryTrigger } from '@/components/shared';
import { cn } from '@/utils/ui';
import { StoryBarProps } from './types';
import { STORY_BAR_LABEL_PREFIX } from './constants';

export const StoryBar: React.FC<StoryBarProps> = ({ stories, onStoryOpen, className }) => {
  return (
    <div className={cn('flex w-full items-center overflow-x-auto', className)} role="list">
      <div className="mx-auto flex items-center gap-11 px-11">
        {stories.map((story, index) => (
          <div key={index} role="listitem" className="shrink-0">
            <StoryTrigger
              item={story}
              onOpen={() => onStoryOpen?.(index)}
              showLabel
              aria-label={`${STORY_BAR_LABEL_PREFIX} ${story.title ?? index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

StoryBar.displayName = 'StoryBar';

export { StoryBarSkeleton } from './skeleton';
