'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button, Typography } from '@/components/ui';
import { PlusIcon } from '@icons';
import { cn } from '@/utils/ui';
import type { LandingBottomBarItem, LandingBottomBarProps } from './types';

const CHIP_CLASS =
  'rounded-4 flex h-11 w-[60px] shrink-0 items-center justify-center border border-white/30 transition-colors hover:bg-white/10';

const Chip: React.FC<{
  item: LandingBottomBarItem;
  onSelect?: (item: LandingBottomBarItem) => void;
}> = ({ item, onSelect }) => {
  const label = (
    <Typography variant="body-xs" className="text-white">
      {item.label}
    </Typography>
  );

  return item.href ? (
    <Link href={item.href} className={CHIP_CLASS}>
      {label}
    </Link>
  ) : (
    <button type="button" className={CHIP_CLASS} onClick={() => onSelect?.(item)}>
      {label}
    </button>
  );
};

export const LandingBottomBar: React.FC<LandingBottomBarProps> = ({
  items,
  actionLabel = 'دسته‌بندی‌های بیشتر',
  actionHref,
  onAction,
  onItemSelect,
  className,
}) => {
  if (items.length === 0) {
    return null;
  }

  const actionInner = (
    <>
      <Button
        size="lg"
        className="rounded-4 bg-white"
        icon={<PlusIcon className="text-wholesale-500 size-10" aria-hidden="true" />}
      />
      <span className="h-px w-3 bg-white" aria-hidden="true" />
    </>
  );

  return (
    <nav
      aria-label="دسته‌بندی‌های سریع"
      className={cn(
        // Fixed 64px band: the centre action is taller than the chips and
        // would otherwise stretch the bar past the design's height.
        'bg-wholesale-500 rounded-t-8 fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-center gap-3 px-7',
        'shadow-[0_-10px_10px_rgba(0,0,0,0.1)] md:hidden',
        className,
      )}
    >
      {items.slice(0, 2).map((item) => (
        <Chip key={item.id} item={item} onSelect={onItemSelect} />
      ))}

      {actionHref ? (
        <Link
          href={actionHref}
          aria-label={actionLabel}
          className="flex shrink-0 flex-col items-center justify-center gap-1"
        >
          {actionInner}
        </Link>
      ) : (
        <button
          type="button"
          aria-label={actionLabel}
          onClick={onAction}
          className="flex shrink-0 flex-col items-center justify-center gap-3"
        >
          {actionInner}
        </button>
      )}

      {items.slice(2, 4).map((item) => (
        <Chip key={item.id} item={item} onSelect={onItemSelect} />
      ))}
    </nav>
  );
};

LandingBottomBar.displayName = 'LandingBottomBar';
