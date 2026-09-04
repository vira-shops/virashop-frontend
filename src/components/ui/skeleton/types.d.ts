import type { HTMLAttributes } from 'react';

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Extra classes merged via cn — utilities outrank the baked-in ones. */
  className?: string;
}
