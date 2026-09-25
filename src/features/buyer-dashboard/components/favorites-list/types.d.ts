import type { ProductGridItem } from '@/components/shared';
import type { FavoriteProduct } from '@/contracts/endpoints/favorites';

/** Builds one grid card from a saved product. */
export type FavoriteToGridItem = (
  item: FavoriteProduct,
  onRemove: (id: number) => void,
) => ProductGridItem;
