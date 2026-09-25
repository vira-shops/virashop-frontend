import type { ProductFilterGroup } from '@/components/shared/product-filter-panel/types';
import type { UseProductListingFiltersResult } from '@/hooks';

export interface ListingFiltersProps {
  filters: UseProductListingFiltersResult;
  priceMax: number;
  categoryGroups: ProductFilterGroup[];
}
