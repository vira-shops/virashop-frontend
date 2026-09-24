import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/ui';
import { AvatarProps, AvatarSize } from './types';

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'avatar-size-xs',
  sm: 'avatar-size-sm',
  md: 'avatar-size-md',
  lg: 'avatar-size-lg',
  xl: 'avatar-size-xl',
};

/** Rendered pixel box per size — feeds `next/image` `sizes` so it never fetches a hero-sized source. */
const pixelSizes: Record<AvatarSize, string> = {
  xs: '20px',
  sm: '32px',
  md: '48px',
  lg: '64px',
  xl: '184px',
};

/** The design's placeholder: a head-and-shoulders silhouette, filled. */
const PersonGlyph: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <circle cx="12" cy="7.5" r="4.5" />
    <path d="M3.5 21c0-4.4 3.8-7.5 8.5-7.5s8.5 3.1 8.5 7.5c0 .6-.4 1-1 1h-15c-.6 0-1-.4-1-1Z" />
  </svg>
);

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  size = 'md',
  ring = false,
  className,
  imageClassName,
  fallbackClassName,
  ...rest
}) => (
  <span
    data-slot="avatar"
    // The photo's own alt names it; only the glyph needs the wrapper to speak.
    role={src ? undefined : 'img'}
    aria-label={src ? undefined : alt || undefined}
    className={cn('avatar', sizeClasses[size], ring && 'avatar-ring', className)}
    {...rest}
  >
    {src ? (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={pixelSizes[size]}
        className={cn('object-cover', imageClassName)}
      />
    ) : (
      <PersonGlyph className={cn('avatar-fallback', fallbackClassName)} />
    )}
  </span>
);

Avatar.displayName = 'Avatar';
