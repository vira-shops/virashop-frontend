import type { StoryItem } from '@/components/shared/story';

export interface StoryBarProps {
  stories: StoryItem[];
  onStoryOpen?: (index: number) => void;
  className?: string;
}
