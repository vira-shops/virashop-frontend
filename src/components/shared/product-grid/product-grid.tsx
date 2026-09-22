import * as React from 'react';
import { Skeleton, Typography } from '@/components/ui';
import { ProductCard } from '@/components/shared/product-card';
import { cn } from '@/utils/ui';
import type { ProductCardOrientation } from '@/components/shared/product-card/types';
import type { ProductGridProps } from './types';

const GRID_CLASSES: Record<ProductCardOrientation, string> = {
  vertical: 'grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4',
  horizontal: 'grid grid-cols-1 gap-5',
};

const VerticalSkeletonCard: React.FC = () => (
  <div className="rounded-9 bg-white shadow-sm">
    <Skeleton className="aspect-product-card rounded-t-9 w-full" />
    <div className="flex flex-col gap-5 p-5">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="rounded-8 h-12 w-full" />
    </div>
  </div>
);

const HorizontalSkeletonCard: React.FC = () => (
  <div className="rounded-9 flex items-center gap-3 bg-white p-3 shadow-sm">
    <Skeleton className="rounded-8 size-18 shrink-0" />
    <div className="flex flex-1 flex-col gap-5">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-3 w-3/4" />
      <Skeleton className="rounded-8 h-12 w-full" />
    </div>
  </div>
);

const SKELETON_CARDS: Record<ProductCardOrientation, React.FC> = {
  vertical: VerticalSkeletonCard,
  horizontal: HorizontalSkeletonCard,
};

/** Content-agnostic grid of `ProductCard` — used by listing pages and PDP related-products rows. */
export const ProductGrid: React.FC<ProductGridProps> = ({
  items,
  isLoading = false,
  skeletonCount = 8,
  emptyLabel = 'محصولی یافت نشد',
  orientation = 'vertical',
  className,
  gridClassName,
}) => {
  const SkeletonCard = SKELETON_CARDS[orientation];

  if (isLoading) {
    return (
      <div aria-hidden="true" className={cn(GRID_CLASSES[orientation], gridClassName, className)}>
        {Array.from({ length: skeletonCount }, (_, index) => (
          <SkeletonCard key={index} />
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

  // Only some products carry badges. Holding the row open on the others keeps
  // their images, prices and buttons on the same lines across the grid.
  const reserveBadgeRow = items.some((item) => item.startBadge || item.endBadge);

  return (
    <div className={cn(GRID_CLASSES[orientation], gridClassName, className)}>
      {items.map(({ id, ...item }) => (
        <ProductCard
          key={id}
          orientation={orientation}
          reserveBadgeRow={reserveBadgeRow}
          {...item}
          // The grid column decides the width; without this the vertical card
          // keeps its 226px `w-product-card` and two columns overflow a phone.
          className={cn('w-full!', item.className)}
        />
      ))}
    </div>
  );
};

ProductGrid.displayName = 'ProductGrid';
