'use client';

import * as React from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/ui';
import { CancelIcon } from '@icons';
import { StoryItem, StoryTriggerProps, StoryTriggerListProps, StoryViewerProps } from './types';

const subscribe = () => () => undefined;

const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
  </svg>
);

/* === Context === */

const StoryViewerContext = React.createContext<{
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
} | null>(null);

const useStoryViewer = () => {
  const ctx = React.useContext(StoryViewerContext);

  if (!ctx) {
    throw new Error('useStoryViewer must be used within a <StoryViewer />');
  }

  return ctx;
};

/* === Trigger === */

export const StoryTrigger = React.forwardRef<HTMLButtonElement, StoryTriggerProps>(
  (
    {
      item,
      onOpen,
      seen,
      showLabel = false,
      className,
      wrapperClassName,
      labelClassName,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn('story-trigger-wrapper', wrapperClassName)}>
        <button
          ref={ref}
          type="button"
          onClick={onOpen}
          className={cn('story-trigger', seen && 'story-trigger-seen', className)}
          aria-label={`مشاهده استوری${item.title ? ` ${item.title}` : ''}`}
          {...props}
        >
          <span className="story-trigger-ring">
            <span className="story-trigger-thumb">
              <Image
                src={item.src}
                alt={item.alt ?? ''}
                fill
                sizes="80px"
                className="story-trigger-image"
              />
              {children && <span className="story-trigger-children">{children}</span>}
            </span>
          </span>
        </button>
        {showLabel && item.title !== undefined && (
          <span className={cn('story-trigger-label', labelClassName)}>{item.title}</span>
        )}
      </div>
    );
  },
);

StoryTrigger.displayName = 'StoryTrigger';

/* === Trigger list === */

export const StoryTriggerList: React.FC<StoryTriggerListProps> = ({
  items,
  onSelect,
  seenIndices,
  showLabel = false,
  className,
  itemClassName,
  children,
  ...props
}) => {
  return (
    <div className={cn('story-trigger-list', className)} {...props}>
      {items.map((item, index) => (
        <StoryTrigger
          key={index}
          item={item}
          onOpen={() => onSelect(index)}
          seen={Boolean(seenIndices?.includes(index))}
          showLabel={showLabel}
          className={itemClassName}
        />
      ))}
      {children}
    </div>
  );
};

/* === Progress (segmented) === */

const StoryProgress: React.FC<{ className?: string }> = ({ className }) => {
  const { items, currentIndex, progress, goTo } = useStoryViewer();

  return (
    <div className={cn('story-progress', className)} role="presentation">
      {items.map((_, index) => {
        const isActive = index === currentIndex;
        const isPast = index < currentIndex;
        const fillPct = isActive ? progress : isPast ? 100 : 0;

        return (
          <button
            key={index}
            type="button"
            className="story-progress-segment"
            onClick={(event) => {
              event.stopPropagation();
              goTo(index);
            }}
            aria-label={`برو به استوری ${index + 1}`}
          >
            <span className="story-progress-fill" style={{ width: `${fillPct}%` }} />
          </button>
        );
      })}
    </div>
  );
};

/* === Viewer === */

const PlayPauseIndicator: React.FC = () => {
  const { isPlaying } = useStoryViewer();
  const [visible, setVisible] = React.useState(false);
  const hideTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
    }

    // setState runs inside setTimeout callbacks (external system), not the effect body.
    const showTimer = window.setTimeout(() => setVisible(true), 0);
    hideTimerRef.current = window.setTimeout(() => setVisible(false), 600);

    return () => {
      window.clearTimeout(showTimer);

      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, [isPlaying]);

  if (!visible) return null;

  return (
    <span className="story-viewer-play-indicator" aria-hidden="true">
      {isPlaying ? <PlayIcon className="size-13" /> : <PauseIcon className="size-13" />}
    </span>
  );
};

export const StoryViewer: React.FC<StoryViewerProps> = (props) => {
  const {
    items,
    open,
    startIndex = 0,
    onClose,
    onIndexChange,
    closeOnBackdrop = true,
    defaultDuration = 5000,
    className,
    backdropClassName,
    progressClassName,
    closeClassName,
  } = props;

  // Renders nothing when closed — avoids mounting the animation loop.
  if (!open) return null;

  // key remounts the viewer (fresh animation loop) per start position.
  return (
    <StoryViewerInner
      key={`${startIndex}:${items.length}`}
      items={items}
      open={open}
      startIndex={startIndex}
      onClose={onClose}
      onIndexChange={onIndexChange}
      closeOnBackdrop={closeOnBackdrop}
      defaultDuration={defaultDuration}
      className={className}
      backdropClassName={backdropClassName}
      progressClassName={progressClassName}
      closeClassName={closeClassName}
    />
  );
};

StoryViewer.displayName = 'StoryViewer';

interface StoryViewerInnerProps {
  items: StoryItem[];
  open: boolean;
  startIndex: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
  closeOnBackdrop: boolean;
  defaultDuration: number;
  className?: string;
  backdropClassName?: string;
  progressClassName?: string;
  closeClassName?: string;
}

const StoryViewerInner: React.FC<StoryViewerInnerProps> = ({
  items,
  open,
  startIndex,
  onClose,
  onIndexChange,
  closeOnBackdrop,
  defaultDuration,
  className,
  backdropClassName,
  progressClassName,
  closeClassName,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(() =>
    Math.min(Math.max(startIndex, 0), Math.max(items.length - 1, 0)),
  );
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [elapsed, setElapsed] = React.useState(0);
  const lastTickRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number | null>(null);

  const currentItem = items[currentIndex];
  const duration = currentItem?.duration ?? defaultDuration;

  // Resets the progress timer per index change (setState via setTimeout).
  const mountedRef = React.useRef(true);

  React.useEffect(() => {
    mountedRef.current = true;
    const t = window.setTimeout(() => {
      if (mountedRef.current) setElapsed(0);
    }, 0);

    return () => {
      mountedRef.current = false;
      window.clearTimeout(t);
    };
  }, [currentIndex]);

  // Auto-advance during render keeps setState outside effect bodies.
  if (open && isPlaying && items.length > 0 && elapsed >= duration) {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setElapsed(0);
  }

  React.useEffect(() => {
    onIndexChange?.(currentIndex);
  }, [currentIndex, onIndexChange]);

  // Animation loop
  React.useEffect(() => {
    if (!open || !isPlaying) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      lastTickRef.current = null;

      return;
    }

    const tick = (now: number) => {
      if (lastTickRef.current === null) {
        lastTickRef.current = now;
      }

      const delta = now - lastTickRef.current;
      lastTickRef.current = now;
      setElapsed((prev) => prev + delta);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      lastTickRef.current = null;
    };
  }, [open, isPlaying, currentIndex]);

  const goPrev = React.useCallback(() => {
    setElapsed(0);
    setCurrentIndex((prev) => (prev - 1 + items.length) % Math.max(items.length, 1));
  }, [items.length]);

  const goNext = React.useCallback(() => {
    setElapsed(0);
    setCurrentIndex((prev) => (prev + 1) % Math.max(items.length, 1));
  }, [items.length]);

  const goTo = React.useCallback(
    (index: number) => {
      if (index < 0 || index >= items.length) return;

      setElapsed(0);
      setCurrentIndex(index);
    },
    [items.length],
  );

  const pause = React.useCallback(() => setIsPlaying(false), []);
  const play = React.useCallback(() => setIsPlaying(true), []);
  const togglePlay = React.useCallback(() => setIsPlaying((p) => !p), []);

  // Keyboard controls
  React.useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goNext();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goPrev();
      } else if (event.key === ' ') {
        event.preventDefault();
        togglePlay();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', onKey);

    return () => document.removeEventListener('keydown', onKey);
  }, [open, goNext, goPrev, togglePlay, onClose]);

  const mounted = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!mounted || !currentItem) return null;

  const progress = Math.min(elapsed / duration, 1);

  const contextValue = {
    items,
    currentIndex,
    isPlaying,
    progress,
    goPrev,
    goNext,
    goTo,
    togglePlay,
    pause,
    play,
    onClose,
    elapsed,
  };

  // Tap zones: left third = previous, right third = next, middle = play/pause
  const handleViewerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button, a, [role="button"]')) return;

    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const third = rect.width / 3;

    if (x < third) {
      goPrev();
    } else if (x > rect.width - third) {
      goNext();
    } else {
      togglePlay();
    }
  };

  return createPortal(
    <StoryViewerContext.Provider value={contextValue}>
      <div className={cn('story-viewer', className)}>
        <div
          className={cn('story-viewer-backdrop', backdropClassName)}
          onClick={closeOnBackdrop ? onClose : undefined}
          aria-hidden="true"
        />

        <div
          className="story-viewer-stage"
          role="dialog"
          aria-modal="true"
          aria-label="مشاهده استوری"
        >
          <StoryProgress className={progressClassName} />

          <button
            type="button"
            className={cn('story-viewer-close', closeClassName)}
            onClick={onClose}
            aria-label="بستن"
          >
            <CancelIcon className="size-12" />
          </button>

          <button
            type="button"
            className="story-viewer-prev"
            onClick={goPrev}
            aria-label="استوری قبلی"
          />

          <button
            type="button"
            className="story-viewer-next"
            onClick={goNext}
            aria-label="استوری بعدی"
          />

          <div className="story-viewer-content" onClick={handleViewerClick} role="presentation">
            <Image
              key={currentItem.src}
              src={currentItem.src}
              alt={currentItem.alt ?? ''}
              fill
              sizes="100vw"
              className="story-viewer-image"
              priority
            />

            {currentItem.description && (
              <div className="story-viewer-description">{currentItem.description}</div>
            )}

            <PlayPauseIndicator />
          </div>

          {currentItem.title && <div className="story-viewer-title">{currentItem.title}</div>}
        </div>
      </div>
    </StoryViewerContext.Provider>,
    document.body,
  );
};
