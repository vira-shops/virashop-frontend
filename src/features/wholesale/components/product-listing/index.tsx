'use client';

import * as React from 'react';
import { ProductListingSection } from '@/components/shared';
import { PATHS } from '@/routes/paths';

export interface ProductListingProps {
  categorySlug: string;
}

/** Wholesale product listing — shared section scoped to the wholesale channel + routes. */
export const ProductListing: React.FC<ProductListingProps> = ({ categorySlug }) => (
  <ProductListingSection
    channel="WHOLESALE"
    categorySlug={categorySlug}
    priceMax={50_000_000}
    hrefForProduct={(slug) => PATHS.WHOLESALE.PRODUCT(slug)}
    hrefForCategory={(slug) => PATHS.WHOLESALE.CATEGORY(slug)}
  />
);

ProductListing.displayName = 'ProductListing';
