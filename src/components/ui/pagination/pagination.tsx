'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import { ArrowLeftIcon } from '@icons';
import type { PaginationColor, PaginationProps, PaginationSize } from './types';

const colorClasses: Record<PaginationColor, string> = {
  primary: 'pagination-primary',
  blue: 'pagination-blue',
};

const sizeClasses: Record<PaginationSize, string> = {
  sm: 'pagination-size-sm',
  md: 'pagination-size-md',
};

const DOTS = 'dots' as const;

const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

/** First/last/current + `siblingCount` neighbors, collapsing gaps into a single ellipsis. */
function buildPaginationRange(
  page: number,
  totalPages: number,
  siblingCount: number,
): (number | typeof DOTS)[] {
  const totalSlots = siblingCount * 2 + 5;

  if (totalSlots >= totalPages) return range(1, totalPages);

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    return [...range(1, 3 + siblingCount * 2), DOTS, totalPages];
  }

  if (showLeftDots && !showRightDots) {
    return [1, DOTS, ...range(totalPages - (3 + siblingCount * 2) + 1, totalPages)];
  }

  return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, totalPages];
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  color = 'primary',
  size = 'md',
  disabled,
  className,
  itemClassName,
}) => {
  if (totalPages <= 1) return null;

  const items = buildPaginationRange(page, totalPages, siblingCount);
  const goTo = (target: number) => {
    if (target < 1 || target > totalPages || target === page || disabled) return;
    onPageChange(target);
  };

  return (
    <nav
      aria-label="صفحه‌بندی"
      dir="rtl"
      className={cn('pagination', colorClasses[color], sizeClasses[size], className)}
    >
      <button
        type="button"
        aria-label="صفحه قبل"
        disabled={disabled || page <= 1}
        onClick={() => goTo(page - 1)}
        className={cn('pagination-item pagination-nav', itemClassName)}
      >
        <ArrowLeftIcon className="size-9" />
      </button>

      {items.map((item, index) =>
        item === DOTS ? (
          <span key={`dots-${index}`} className="pagination-dots" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-current={item === page ? 'page' : undefined}
            disabled={disabled}
            onClick={() => goTo(item)}
            className={cn(
              'pagination-item',
              item === page && 'pagination-item-active',
              itemClassName,
            )}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="صفحه بعد"
        disabled={disabled || page >= totalPages}
        onClick={() => goTo(page + 1)}
        className={cn('pagination-item pagination-nav', itemClassName)}
      >
        <ArrowLeftIcon className="size-9 rotate-180" />
      </button>
    </nav>
  );
};
