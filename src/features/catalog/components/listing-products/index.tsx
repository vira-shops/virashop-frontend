'use client';

import * as React from 'react';
import { Pagination } from '@/components/ui';
import { ProductGrid } from '@/components/shared';
import { MOBILE_CARD_OVERRIDES, MOBILE_SKELETON_COUNT } from './constants';
import type { ListingProductsProps } from './types';

export type { ListingProductsProps } from './types';

/**
 * The catalog's own card layout: compact horizontal rows on mobile, the
 * standard vertical grid from `md` up. Two grids rather than one responsive
 * card so `ProductCard`/`ProductGrid` stay breakpoint-neutral — the hidden
 * grid's images are never in the viewport, so they are never fetched.
 */
export const ListingProducts: React.FC<ListingProductsProps> = ({
  items,
  isLoading,
  page,
  totalPages,
  onPageChange,
}) => (
  <div className="flex flex-1 flex-col gap-6">
    <ProductGrid
      orientation="horizontal"
      className="md:hidden"
      isLoading={isLoading}
      skeletonCount={MOBILE_SKELETON_COUNT}
      items={items.map((item) => ({ ...item, ...MOBILE_CARD_OVERRIDES }))}
    />

    <ProductGrid className="hidden md:grid" isLoading={isLoading} items={items} />

    <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
  </div>
);

ListingProducts.displayName = 'ListingProducts';
