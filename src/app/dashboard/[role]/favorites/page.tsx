import { FavoritesList } from '@/features/buyer-dashboard';
import { favoritesMetadata } from '@/config/metadata';

export const metadata = favoritesMetadata;

export default function BuyerFavoritesPage() {
  return <FavoritesList />;
}
