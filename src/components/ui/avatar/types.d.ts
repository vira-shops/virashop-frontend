import type { HTMLAttributes } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Photo URL — omit (or pass null) to show the neutral person placeholder. */
  src?: string | null;
  /** Accessible name — also the image alt. */
  alt?: string;
  /** @default 'md' */
  size?: AvatarSize;
  /** White ring around the circle — for avatars sitting on a colored band. */
  ring?: boolean;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  imageClassName?: string;
  fallbackClassName?: string;
}
