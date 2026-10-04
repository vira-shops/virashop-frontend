'use client';

import * as React from 'react';
import { Button } from '@/components/ui';
import { LocationBoldIcon } from '@icons';
import { cn } from '@/utils/ui';
import { LOCATION_PICKER_COPY } from './constants';
import { LocationPickerModal } from './location-picker-modal';
import { MapThumbnail } from './map-thumbnail';
import type { LocationPickerFieldProps } from './types';

/**
 * «انتخاب روی نقشه» — a dashed tile that opens the map modal. Once a point
 * is saved the tile shows its map preview. Controlled; plug it into a form
 * with `Controller`.
 */
export const LocationPickerField: React.FC<LocationPickerFieldProps> = ({
  value,
  onChange,
  disabled = false,
  title,
  theme,
  className,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        aria-label={value ? LOCATION_PICKER_COPY.change : LOCATION_PICKER_COPY.pick}
        disabled={disabled}
        onClick={() => setOpen(true)}
        className={cn(
          'rounded-5 border-primary/60 relative h-26 w-full flex-col gap-3 overflow-hidden border border-dashed p-0 text-gray-300 hover:bg-transparent',
          className,
        )}
      >
        {value ? (
          <>
            <MapThumbnail value={value} className="absolute inset-0 size-full rounded-none" />
            <span className="text-caption-md relative mt-auto mb-3 rounded-full bg-white/90 px-4 py-1 text-gray-700">
              {LOCATION_PICKER_COPY.change}
            </span>
          </>
        ) : (
          <>
            <LocationBoldIcon className="size-8" aria-hidden="true" />
            <span className="text-caption-md">{LOCATION_PICKER_COPY.pick}</span>
          </>
        )}
      </Button>

      <LocationPickerModal
        open={open}
        title={title}
        theme={theme}
        initialValue={value}
        onClose={() => setOpen(false)}
        onConfirm={(point) => {
          onChange(point);
          setOpen(false);
        }}
      />
    </>
  );
};

LocationPickerField.displayName = 'LocationPickerField';
