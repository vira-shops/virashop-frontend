import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/ui';
import { toFaDigits } from '@/utils/format';
import type { ThumbnailSize, ThumbnailStackProps } from './types';

const sizeClasses: Record<ThumbnailSize, string> = {
  sm: 'size-11',
  md: 'size-13',
  lg: 'size-14',
};

const pixelSizes: Record<ThumbnailSize, string> = {
  sm: '32px',
  md: '48px',
  lg: '64px',
};

const TILE =
  'rounded-4 relative flex shrink-0 items-center justify-center overflow-hidden border border-blue-100 bg-white';

/** A row of product thumbnails — the first `max`, then a «+n» tile for the rest. */
export const ThumbnailStack: React.FC<ThumbnailStackProps> = ({
  images,
  max = 4,
  size = 'md',
  className,
  itemClassName,
}) => {
  const visible = images.slice(0, max);
  const hidden = images.length - visible.length;

  return (
    <ul className={cn('flex items-center gap-3', className)}>
      {visible.map((image, index) => (
        <li key={`${image.src}-${index}`} className={cn(TILE, sizeClasses[size], itemClassName)}>
          <Image
            src={image.src}
            alt={image.alt ?? ''}
            fill
            sizes={pixelSizes[size]}
            className="object-contain p-1"
          />
        </li>
      ))}
      {hidden > 0 && (
        <li
          aria-label={`${toFaDigits(hidden)} کالای دیگر`}
          className={cn(TILE, sizeClasses[size], 'text-caption-md text-blue-300', itemClassName)}
        >
          +{toFaDigits(hidden)}
        </li>
      )}
    </ul>
  );
};

ThumbnailStack.displayName = 'ThumbnailStack';
