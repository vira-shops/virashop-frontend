import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export interface StoryItem {
  src: string;
  alt?: string;
  /** Caption rendered on top of the image. */
  description?: ReactNode;
  title?: ReactNode;
  /** @default 5000 — milliseconds */
  duration?: number;
}

export type StoryViewerSize = 'sm' | 'md' | 'lg';

export interface StoryViewerContextType {
  items: StoryItem[];
  currentIndex: number;
  isPlaying: boolean;
  progress: number;
  goPrev: () => void;
  goNext: () => void;
  goTo: (index: number) => void;
  togglePlay: () => void;
  pause: () => void;
  play: () => void;
  onClose: () => void;
  elapsed: number;
}

export interface StoryTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  item: StoryItem;
  onOpen: () => void;
  seen?: boolean;
  /** @default false */
  showLabel?: boolean;
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  children?: ReactNode;
}

export interface StoryTriggerListProps extends HTMLAttributes<HTMLDivElement> {
  items: StoryItem[];
  /** Called with the clicked item's index so the parent can open the viewer there. */
  onSelect: (index: number) => void;
  seenIndices?: number[];
  /** @default false */
  showLabel?: boolean;
  className?: string;
  itemClassName?: string;
  children?: ReactNode;
}

export interface StoryViewerProps {
  items: StoryItem[];
  open: boolean;
  startIndex?: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
  /** @default true */
  closeOnBackdrop?: boolean;
  /** Default duration in ms when an item doesn't define its own. @default 5000 */
  defaultDuration?: number;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  backdropClassName?: string;
  progressClassName?: string;
  closeClassName?: string;
}
