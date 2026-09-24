'use client';

import * as React from 'react';
import { EmptyState, PageHeading, ProductGrid, type ProductGridItem } from '@/components/shared';
import type { FavoriteProduct } from '@/contracts/endpoints/favorites';
import { useFavorites, useRemoveFavorite } from '@/hooks';
import { PATHS } from '@/routes/paths';
import { formatToman } from '@/utils/format';
import {
  FAVORITES_EMPTY,
  FAVORITE_BUY_LABEL,
  FAVORITE_REMOVE_LABEL,
  PAGE_TITLES,
} from '@/features/buyer-dashboard/constants';

const productHref = (item: FavoriteProduct) =>
  item.channel === 'WHOLESALE'
    ? PATHS.WHOLESALE.PRODUCT(item.productSlug)
    : PATHS.RETAIL.PRODUCT(item.productSlug);

/** Saved products — vertical cards on desktop, compact rows on phones. */
export const FavoritesList: React.FC = () => {
  const favorites = useFavorites();
  const remove = useRemoveFavorite();

  const items: ProductGridItem[] = (favorites.data ?? []).map((item) => ({
    id: item.id,
    image: { src: item.image, alt: item.name },
    title: item.name,
    price: formatToman(item.price),
    originalPrice: item.originalPrice ? formatToman(item.originalPrice) : undefined,
    onRemove: () => remove.mutate(item.id),
    removeLabel: FAVORITE_REMOVE_LABEL,
    // The seller (and so the cart line) is picked on the product page.
    action: { label: FAVORITE_BUY_LABEL, href: productHref(item) },
  }));

  const isEmpty = !favorites.isLoading && items.length === 0;

  return (
    <>
      <PageHeading title={PAGE_TITLES.favorites} />

      {isEmpty ? (
        <EmptyState message={FAVORITES_EMPTY.message} highlight={FAVORITES_EMPTY.highlight} />
      ) : (
        <>
          <ProductGrid
            items={items}
            isLoading={favorites.isLoading}
            skeletonCount={4}
            orientation="horizontal"
            className="md:hidden"
          />
          <ProductGrid
            items={items}
            isLoading={favorites.isLoading}
            gridClassName="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            className="max-md:hidden"
          />
        </>
      )}
    </>
  );
};
