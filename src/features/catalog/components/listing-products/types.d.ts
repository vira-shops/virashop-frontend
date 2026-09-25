import type { ProductGridItem } from '@/components/shared/product-grid/types';

export interface ListingProductsProps {
  items: ProductGridItem[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
