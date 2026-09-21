import type {
  ProductCardOrientation,
  ProductCardProps,
} from '@/components/shared/product-card/types';

/** One card in the grid — `ProductCardProps` plus a stable React key. */
export type ProductGridItem = ProductCardProps & { id: string | number };

export interface ProductGridProps {
  items: ProductGridItem[];
  isLoading?: boolean;
  /** Number of skeleton tiles while `isLoading`. @default 8 */
  skeletonCount?: number;
  /** Shown when `items` is empty and not loading. */
  emptyLabel?: string;
  /** Card layout + matching grid/skeleton shape. @default 'vertical' */
  orientation?: ProductCardOrientation;
  className?: string;
  /** Extra classes for the grid itself (merged over the default responsive grid). */
  gridClassName?: string;
}
