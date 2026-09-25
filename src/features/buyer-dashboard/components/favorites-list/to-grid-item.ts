import type { FavoriteProduct } from '@/contracts/endpoints/favorites';
import { PATHS } from '@/routes/paths';
import { formatToman } from '@/utils/format';
import { FAVORITE_BUY_LABEL, FAVORITE_REMOVE_LABEL } from './constants';
import type { FavoriteToGridItem } from './types';

const productHref = (item: FavoriteProduct) =>
  item.channel === 'WHOLESALE'
    ? PATHS.WHOLESALE.PRODUCT(item.productSlug)
    : PATHS.RETAIL.PRODUCT(item.productSlug);

export const toGridItem: FavoriteToGridItem = (item, onRemove) => ({
  id: item.id,
  image: { src: item.image, alt: item.name },
  title: item.name,
  price: formatToman(item.price),
  originalPrice: item.originalPrice ? formatToman(item.originalPrice) : undefined,
  onRemove: () => onRemove(item.id),
  removeLabel: FAVORITE_REMOVE_LABEL,
  // The seller (and so the cart line) is picked on the product page.
  action: { label: FAVORITE_BUY_LABEL, href: productHref(item) },
});
