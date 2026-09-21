import Link from 'next/link';
import { cn } from '@/utils/ui';
import { Typography } from '@/components/ui';
import type { BreadcrumbProps } from './types';

export function Breadcrumb({
  items,
  className,
  itemClassName,
  separatorClassName,
  linkClassName,
  activeClassName,
}: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={cn('flex items-center gap-5', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.label} className={cn('flex items-center gap-5', itemClassName)}>
            {index > 0 && (
              <span className={cn('text-gray-300', separatorClassName)} aria-hidden="true">
                /
              </span>
            )}

            {isLast || !item.href ? (
              <Typography variant="body-xs" color="gray" className={activeClassName}>
                {item.label}
              </Typography>
            ) : (
              <Link href={item.href}>
                <Typography
                  variant="body-xs"
                  color="primary"
                  className={cn('hover:underline', linkClassName)}
                >
                  {item.label}
                </Typography>
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
