import * as React from 'react';
import { cn } from '@/utils/ui';
import { SkeletonProps } from './types';

/** Pulsing placeholder sized by utility classes — decorative (aria-hidden). */
export const Skeleton: React.FC<SkeletonProps> = ({ className, ...rest }) => (
  <div aria-hidden="true" className={cn('skeleton', className)} {...rest} />
);

Skeleton.displayName = 'Skeleton';
