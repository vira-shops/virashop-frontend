import * as React from 'react';
import { CancelIcon, InfoCircleIcon, TickIcon } from '@icons';
import { cn } from '@/utils/ui';
import { StatusIconProps, StatusIconSize, StatusIconStatus } from './types';

const statusClasses: Record<StatusIconStatus, string> = {
  success: 'status-icon-success',
  error: 'status-icon-error',
  warning: 'status-icon-warning',
};

const sizeClasses: Record<StatusIconSize, string> = {
  sm: 'status-icon-size-sm',
  md: 'status-icon-size-md',
};

const glyphs: Record<StatusIconStatus, React.FC<React.SVGProps<SVGSVGElement>>> = {
  success: TickIcon,
  error: CancelIcon,
  warning: InfoCircleIcon,
};

/** Small rounded ✓ / ✗ / ! chip — payment state in order tables and details. */
export const StatusIcon: React.FC<StatusIconProps> = ({
  status,
  size = 'md',
  label,
  className,
  ...rest
}) => {
  const Glyph = glyphs[status];

  return (
    <span
      data-slot="status-icon"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn('status-icon', statusClasses[status], sizeClasses[size], className)}
      {...rest}
    >
      <Glyph aria-hidden="true" />
    </span>
  );
};

StatusIcon.displayName = 'StatusIcon';
