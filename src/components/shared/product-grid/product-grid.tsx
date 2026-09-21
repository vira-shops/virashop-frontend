import * as React from 'react';
import { Skeleton, Typography } from '@/components/ui';
import { ProductCard } from '@/components/shared/product-card';
import { cn } from '@/utils/ui';
import type { ProductGridProps } from './types';

const DEFAULT_GRID_CLASS = 'grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4';

const ProductGridSkeletonCard: React.FC = () => (
  <div className="rounded-9 bg-white shadow-sm">
    <Skeleton className="aspect-product-card rounded-t-9 w-full" />
    <div className="flex flex-col gap-5 p-5">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="rounded-8 h-12 w-full" />
    </div>
  </div>
);

/** Content-agnostic grid of `ProductCard` — used by listing pages and PDP related-products rows. */
export const ProductGrid: React.FC<ProductGridProps> = ({
  items,
  isLoading = false,
  skeletonCount = 8,
  emptyLabel = 'محصولی یافت نشد',
  className,
  gridClassName,
}) => {
  if (isLoading) {
    return (
      <div aria-hidden="true" className={cn(DEFAULT_GRID_CLASS, gridClassName, className)}>
        {Array.from({ length: skeletonCount }, (_, index) => (
          <ProductGridSkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={cn('flex items-center justify-center py-20', className)}>
        <Typography variant="body-md" className="text-gray-300">
          {emptyLabel}
        </Typography>
      </div>
    );
  }

  return (
    <div className={cn(DEFAULT_GRID_CLASS, gridClassName, className)}>
      {items.map(({ id, ...item }) => (
        <ProductCard key={id} {...item} />
      ))}
    </div>
  );
};

ProductGrid.displayName = 'ProductGrid';
