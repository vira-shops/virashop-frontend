'use client';

import * as React from 'react';
import { EmptyState, PageHeading, ProductGrid } from '@/components/shared';
import { useFavorites, useRemoveFavorite } from '@/hooks';
import { PAGE_TITLES } from '@/features/buyer-dashboard/constants';
import { DESKTOP_GRID_CLASS, FAVORITES_EMPTY, MOBILE_SKELETON_COUNT } from './constants';
import { toGridItem } from './to-grid-item';

/** Saved products — vertical cards on desktop, compact rows on phones. */
export const FavoritesList: React.FC = () => {
  const favorites = useFavorites();
  const remove = useRemoveFavorite();

  const items = (favorites.data ?? []).map((item) => toGridItem(item, remove.mutate));
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
            skeletonCount={MOBILE_SKELETON_COUNT}
            orientation="horizontal"
            className="md:hidden"
          />
          <ProductGrid
            items={items}
            isLoading={favorites.isLoading}
            gridClassName={DESKTOP_GRID_CLASS}
            className="max-md:hidden"
          />
        </>
      )}
    </>
  );
};
