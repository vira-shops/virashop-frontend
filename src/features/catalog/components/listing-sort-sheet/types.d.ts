import type { ProductSort } from '@/contracts/endpoints/products';

export interface ListingSortSheetProps {
  open: boolean;
  sort: ProductSort;
  theme: string;
  onSelect: (sort: ProductSort) => void;
  onClose: () => void;
}
