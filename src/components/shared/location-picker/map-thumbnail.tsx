import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/ui';
import { LOCATION_PICKER_COPY, THUMBNAIL_ZOOM, osmTileUrl } from './constants';
import { tileBlockFor } from './tiles';
import type { MapThumbnailProps } from './types';

const TILE_OFFSETS = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
] as const;

/**
 * A static map preview centered on a point — four raw OSM tiles and a CSS pin,
 * no Leaflet. Cheap enough for list rows.
 */
export const MapThumbnail: React.FC<MapThumbnailProps> = ({
  value,
  zoom = THUMBNAIL_ZOOM,
  label = LOCATION_PICKER_COPY.thumbnail,
  className,
}) => {
  const { x0, y0, offsetX, offsetY } = tileBlockFor(value, zoom);

  return (
    <span
      role="img"
      aria-label={label}
      className={cn(
        'rounded-4 relative block size-14 shrink-0 overflow-hidden bg-blue-50',
        className,
      )}
    >
      {/* The block is two tiles wide; shift it so the point lands mid-box. */}
      <span
        dir="ltr"
        className="absolute grid h-[200%] w-[200%] grid-cols-2"
        style={{ left: `${(0.5 - offsetX) * 100}%`, top: `${(0.5 - offsetY) * 100}%` }}
      >
        {TILE_OFFSETS.map(([dx, dy]) => (
          <Image
            key={`${dx}-${dy}`}
            src={osmTileUrl(zoom, x0 + dx, y0 + dy)}
            alt=""
            width={256}
            height={256}
            unoptimized
            draggable={false}
            className="size-full select-none"
          />
        ))}
      </span>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
        <span className="location-pin location-pin-sm" />
      </span>
    </span>
  );
};

MapThumbnail.displayName = 'MapThumbnail';
