import * as React from 'react';
import { cn } from '@/utils/ui';
import type { DescriptionListProps } from './types';

/** Semantic label → value grid (order info, sender info, …). */
export const DescriptionList: React.FC<DescriptionListProps> = ({
  items,
  className,
  itemClassName,
  labelClassName,
  valueClassName,
}) => (
  <dl className={cn('grid grid-cols-1 gap-x-7 gap-y-9', className)}>
    {items.map((item) => (
      <div
        key={item.id ?? item.label}
        className={cn(
          'flex min-w-0 items-center justify-between gap-3 border-blue-100',
          item.fullWidth && 'col-span-full',
          itemClassName,
        )}
      >
        <dt className={cn('text-body-sm shrink-0 text-blue-300', labelClassName)}>{item.label}</dt>
        <dd
          className={cn('text-body-sm flex min-w-0 items-center gap-3 text-black', valueClassName)}
        >
          {item.value}
        </dd>
      </div>
    ))}
  </dl>
);

DescriptionList.displayName = 'DescriptionList';
