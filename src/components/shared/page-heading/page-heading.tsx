import * as React from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@icons';
import { Badge, Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import { toFaDigits } from '@/utils/format';
import type { PageHeadingProps } from './types';

/** Page / sub-page title row: optional back link, title, count chip and an actions slot. */
export const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  count,
  backHref,
  backLabel = 'بازگشت',
  actions,
  as = 'h1',
  bordered = false,
  className,
  titleClassName,
  actionsClassName,
}) => (
  <div
    className={cn(
      'flex items-center justify-between gap-5',
      bordered && 'border-b border-blue-100 pb-7',
      className,
    )}
  >
    <div className="flex min-w-0 items-center gap-3">
      {backHref && (
        // RTL: "back" points right, toward where the reader came from.
        <Link
          href={backHref}
          aria-label={backLabel}
          className="rounded-4 hover:text-primary flex shrink-0 items-center text-blue-300 transition-colors"
        >
          <ChevronRightIcon className="size-10" aria-hidden="true" />
        </Link>
      )}
      <Typography variant="h4" as={as} className={cn('truncate text-blue-900', titleClassName)}>
        {title}
      </Typography>
      {Boolean(count) && (
        <Badge color="warning-red" size="xs" radius="md" className="px-2">
          {toFaDigits(count!)}
        </Badge>
      )}
    </div>
    {actions && (
      <div className={cn('flex shrink-0 items-center gap-5', actionsClassName)}>{actions}</div>
    )}
  </div>
);

PageHeading.displayName = 'PageHeading';
