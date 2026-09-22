'use client';

import * as React from 'react';
import { Pagination } from '@/components/ui';
import { ProductGrid } from '@/components/shared';
import type { ProductGridItem } from '@/components/shared/product-grid/types';

export interface ListingProductsProps {
  items: ProductGridItem[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * The catalog's own card layout: compact horizontal rows on mobile, the
 * standard vertical grid from `md` up. Two grids rather than one responsive
 * card so `ProductCard`/`ProductGrid` stay breakpoint-neutral — the hidden
 * grid's images are never in the viewport, so they are never fetched.
 *
 * The mobile row follows the listing mock: no price line, no dotted rule.
 * Both are hidden through the panel overrides rather than by changing the
 * shared card, so every other card in the app is untouched.
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
      skeletonCount={6}
      items={items.map((item) => ({
        ...item,
        separatorClassName: 'hidden',
        priceRowClassName: 'hidden',
      }))}
    />

    <ProductGrid className="hidden md:grid" isLoading={isLoading} items={items} />

    <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
  </div>
);

ListingProducts.displayName = 'ListingProducts';
