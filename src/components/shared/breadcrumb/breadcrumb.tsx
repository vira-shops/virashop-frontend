import Link from 'next/link';
import { cn } from '@/utils/ui';
import { Typography } from '@/components/ui';
import type { BreadcrumbProps } from './types';

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={cn('flex items-center gap-2', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.label} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-gray-300" aria-hidden="true">
                /
              </span>
            )}

            {isLast || !item.href ? (
              <Typography variant="caption-lg" color="gray">
                {item.label}
              </Typography>
            ) : (
              <Link href={item.href}>
                <Typography variant="caption-lg" color="primary" className="hover:underline">
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
