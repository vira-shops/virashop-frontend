import * as React from 'react';
import { StarBoldIcon } from '@icons';
import { cn } from '@/utils/ui';
import { toFaDigits } from '@/utils/format';
import { RatingProps, RatingSize } from './types';

const sizeClasses: Record<RatingSize, string> = {
  sm: 'rating-size-sm',
  md: 'rating-size-md',
  lg: 'rating-size-lg',
};

/** Read-only star score — filled stars first (on the right in RTL). */
export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'sm',
  label,
  className,
  starClassName,
  ...rest
}) => {
  const filled = Math.min(max, Math.max(0, Math.round(value)));

  return (
    <span
      data-slot="rating"
      role="img"
      aria-label={label ?? `امتیاز ${toFaDigits(filled)} از ${toFaDigits(max)}`}
      className={cn('rating', sizeClasses[size], className)}
      {...rest}
    >
      {Array.from({ length: max }, (_, index) => (
        <StarBoldIcon
          key={index}
          aria-hidden="true"
          data-filled={index < filled}
          className={cn('rating-star', index < filled && 'rating-star-filled', starClassName)}
        />
      ))}
    </span>
  );
};

Rating.displayName = 'Rating';
