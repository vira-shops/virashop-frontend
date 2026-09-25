import * as React from 'react';
import { Avatar, Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import type { UserIdentityProps } from './types';

/**
 * Avatar + name + subtitle — the account block on the dashboard header band.
 * Colors default to white-on-brand; pass the `*ClassName` overrides to reuse
 * it on a light surface.
 */
export const UserIdentity: React.FC<UserIdentityProps> = ({
  name,
  subtitle,
  avatarSrc,
  avatarSize = 'lg',
  compact = false,
  className,
  avatarClassName,
  nameClassName,
  subtitleClassName,
}) => (
  <div className={cn('flex items-center gap-5', className)}>
    <Avatar src={avatarSrc} alt={name} size={avatarSize} ring className={avatarClassName} />
    {!compact && (
      <div className="flex min-w-0 flex-col gap-1">
        <Typography variant="h5" as="p" className={cn('truncate text-white', nameClassName)}>
          {name}
        </Typography>
        {subtitle && (
          <Typography
            variant="caption-md"
            as="p"
            className={cn('truncate text-white/70', subtitleClassName)}
          >
            {subtitle}
          </Typography>
        )}
      </div>
    )}
  </div>
);

UserIdentity.displayName = 'UserIdentity';
