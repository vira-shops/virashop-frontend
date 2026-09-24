import * as React from 'react';
import Link from 'next/link';
import { Skeleton, Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import { toFaDigits } from '@/utils/format';
import type { StatCardProps } from './types';

const SHELL =
  'rounded-8 flex items-start justify-between gap-5 border border-blue-100 bg-white p-7 transition-shadow';

/** KPI tile: icon + label on the start side, the big number on the end side. */
export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  href,
  loading = false,
  className,
  iconClassName,
  labelClassName,
  valueClassName,
}) => {
  const body = (
    <>
      <div className="flex flex-col items-start gap-5">
        <span
          aria-hidden="true"
          className={cn(
            'flex size-13 items-center justify-center rounded-full bg-blue-900 text-white [&_svg]:size-10',
            iconClassName,
          )}
        >
          {icon}
        </span>
        <Typography variant="body-sm" as="span" className={cn('text-blue-300', labelClassName)}>
          {label}
        </Typography>
      </div>
      {loading ? (
        <Skeleton className="rounded-4 h-13 w-12" />
      ) : (
        <Typography
          variant="display-2"
          as="span"
          className={cn('leading-none text-blue-900', valueClassName)}
        >
          {typeof value === 'number' ? toFaDigits(value) : value}
        </Typography>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(SHELL, 'hover:shadow-md', className)}>
        {body}
      </Link>
    );
  }

  return <div className={cn(SHELL, className)}>{body}</div>;
};

StatCard.displayName = 'StatCard';
