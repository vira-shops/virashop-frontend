import type { ProductSort } from '@/contracts/endpoints/products';

export interface ListingSortTabsProps {
  sort: ProductSort;
  total: number;
  onSortChange: (sort: ProductSort) => void;
}
