import * as React from 'react';
import { BoxIcon } from '@icons';
import { Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import type { EmptyStateProps, EmptyStateVariant } from './types';

const shellClasses: Record<EmptyStateVariant, string> = {
  card: 'rounded-8 w-full max-w-56 flex-col justify-center gap-5 bg-white px-7 py-18 text-center shadow-sm',
  inline: 'rounded-8 w-full border border-blue-100 bg-white px-11 py-9',
};

/** «Nothing here» placeholder with the design's red emphasis on the last word. */
export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  highlight,
  icon,
  variant = 'card',
  action,
  className,
  messageClassName,
  iconClassName,
}) => (
  <div role="status" className={cn('flex items-center', shellClasses[variant], className)}>
    {variant === 'card' && (
      <span aria-hidden="true" className={cn('text-blue-200 [&_svg]:size-12', iconClassName)}>
        {icon ?? <BoxIcon />}
      </span>
    )}
    <Typography variant="body-sm" as="p" className={cn('text-blue-300', messageClassName)}>
      {message}
      {highlight && (
        <>
          {' '}
          <strong className="text-warning-red font-medium">{highlight}</strong>
        </>
      )}
    </Typography>
    {action}
  </div>
);

EmptyState.displayName = 'EmptyState';
