'use client';

import * as React from 'react';
import { LocationIcon } from '@icons';
import { Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import { LOCATION_ARIA_LABEL } from './constants';
import type { LocationBadgeProps } from './types';

export const LocationBadge: React.FC<LocationBadgeProps> = ({ city, className }) => (
  <div aria-label={LOCATION_ARIA_LABEL} className={cn('flex items-center gap-2', className)}>
    <LocationIcon className="size-8" aria-hidden="true" />
    <Typography variant="caption-lg" className="text-gray-600">
      {city}
    </Typography>
  </div>
);

LocationBadge.displayName = 'LocationBadge';
