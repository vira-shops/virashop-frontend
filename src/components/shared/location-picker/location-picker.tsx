'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui';
import { cn } from '@/utils/ui';
import { DEFAULT_CENTER, DEFAULT_ZOOM, LOCATION_PICKER_COPY } from './constants';
import type { LocationPickerProps } from './types';

const LocationMap = dynamic(() => import('./location-map'), {
  ssr: false,
  loading: () => <Skeleton className="size-full" />,
});

/** Pick a point on an OpenStreetMap map — click to place the pin, drag to adjust. */
export const LocationPicker: React.FC<LocationPickerProps> = ({
  value,
  onChange,
  defaultCenter = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  className,
}) => (
  <div
    role="application"
    aria-label={LOCATION_PICKER_COPY.mapLabel}
    className={cn('rounded-6 relative isolate h-80 w-full overflow-hidden', className)}
  >
    <LocationMap value={value} onChange={onChange} defaultCenter={defaultCenter} zoom={zoom} />
  </div>
);

LocationPicker.displayName = 'LocationPicker';
