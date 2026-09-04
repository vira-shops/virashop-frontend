import type { StoryItem } from '@/components/shared';

export interface StoryBarProps {
  stories: StoryItem[];
  onStoryOpen?: (index: number) => void;
  className?: string;
}
