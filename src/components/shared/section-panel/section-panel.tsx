import * as React from 'react';
import { Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import type { SectionPanelProps } from './types';

/** A titled block whose heading sits on a soft, fully-rounded tinted bar. */
export const SectionPanel: React.FC<SectionPanelProps> = ({
  title,
  actions,
  as = 'h2',
  children,
  className,
  headerClassName,
  titleClassName,
  bodyClassName,
}) => {
  const headingId = React.useId();

  return (
    <section aria-labelledby={headingId} className={cn('flex flex-col gap-7', className)}>
      <div
        className={cn(
          'flex items-center justify-between gap-5 rounded-full bg-blue-50 px-9 py-4',
          headerClassName,
        )}
      >
        <Typography
          id={headingId}
          variant="body-sm"
          as={as}
          className={cn('font-medium text-blue-900', titleClassName)}
        >
          {title}
        </Typography>
        {actions}
      </div>
      <div className={cn('px-2', bodyClassName)}>{children}</div>
    </section>
  );
};

SectionPanel.displayName = 'SectionPanel';
