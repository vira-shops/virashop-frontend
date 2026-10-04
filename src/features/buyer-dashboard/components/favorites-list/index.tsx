'use client';

import * as React from 'react';
import { Skeleton } from '@/components/ui';
import { EmptyState, PageHeading } from '@/components/shared';
import { useFavorites, useRemoveFavorite } from '@/hooks';
import { PAGE_TITLES } from '@/features/buyer-dashboard/constants';
import { FAVORITES_EMPTY, FAVORITES_GRID_CLASS, SKELETON_COUNT } from './constants';
import { FavoriteCard } from './favorite-card';

/** Saved products — a card grid on desktop, compact rows on phones. */
export const FavoritesList: React.FC = () => {
  const favorites = useFavorites();
  const remove = useRemoveFavorite();
  const items = favorites.data ?? [];

  return (
    <>
      <PageHeading title={PAGE_TITLES.favorites} />

      {favorites.isLoading && (
        <div className={FAVORITES_GRID_CLASS} aria-busy="true">
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <Skeleton key={index} className="rounded-8 h-36 md:h-80" />
          ))}
        </div>
      )}

      {!favorites.isLoading && items.length === 0 && (
        <EmptyState message={FAVORITES_EMPTY.message} highlight={FAVORITES_EMPTY.highlight} />
      )}

      {items.length > 0 && (
        <ul className={FAVORITES_GRID_CLASS}>
          {items.map((item) => (
            <li key={item.id}>
              <FavoriteCard item={item} onRemove={remove.mutate} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
