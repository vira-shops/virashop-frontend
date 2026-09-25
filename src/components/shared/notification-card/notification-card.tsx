'use client';

import * as React from 'react';
import { ChevronLeftIcon, DownIcon } from '@icons';
import { Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import { formatJalaliDate } from '@/utils/format';
import type { NotificationCardProps } from './types';

/**
 * Expandable message card. Collapsed shows a two-line preview; the title is
 * the toggle button (`aria-expanded`) for keyboard / screen-reader users,
 * while a click anywhere on the card toggles it for mouse users. The open
 * card gets the primary border from the design.
 */
export const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  body,
  date,
  read = false,
  defaultExpanded = false,
  expanded: expandedProp,
  onExpandedChange,
  className,
  titleClassName,
  bodyClassName,
}) => {
  const [innerExpanded, setInnerExpanded] = React.useState(defaultExpanded);
  const expanded = expandedProp ?? innerExpanded;
  const bodyId = React.useId();

  const toggle = () => {
    setInnerExpanded(!expanded);
    onExpandedChange?.(!expanded);
  };

  const Chevron = expanded ? DownIcon : ChevronLeftIcon;

  return (
    // The card-wide click is a mouse convenience; the title button is the real control.

    <article
      data-read={read}
      onClick={toggle}
      className={cn(
        'rounded-8 flex cursor-pointer flex-col gap-5 border bg-white p-9 transition-colors',
        expanded ? 'border-primary' : 'border-blue-100',
        className,
      )}
    >
      <Typography variant="h5" as="h3">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={bodyId}
          onClick={(event) => {
            event.stopPropagation();
            toggle();
          }}
          className={cn(
            'w-full text-start',
            read ? 'text-blue-300' : 'text-blue-900',
            titleClassName,
          )}
        >
          {title}
        </button>
      </Typography>
      <Typography
        id={bodyId}
        variant="body-sm"
        as="p"
        className={cn(
          'leading-8',
          read ? 'text-blue-300' : 'text-black',
          !expanded && 'line-clamp-2',
          bodyClassName,
        )}
      >
        {body}
      </Typography>
      <div className="flex items-center justify-between gap-5">
        <time dateTime={date} className="text-caption-md text-blue-300">
          {formatJalaliDate(date)}
        </time>
        <Chevron aria-hidden="true" className="size-9 text-blue-300" />
      </div>
    </article>
  );
};

NotificationCard.displayName = 'NotificationCard';
