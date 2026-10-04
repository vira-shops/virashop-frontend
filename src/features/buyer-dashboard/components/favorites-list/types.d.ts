import type { FavoriteProduct } from '@/contracts/endpoints/favorites';

export interface FavoriteCardProps {
  item: FavoriteProduct;
  onRemove: (id: number) => void;
}

export interface SaleCountdownProps {
  /** ISO deadline. */
  endsAt: string;
}
