'use client';

import * as React from 'react';
import { ProductListingSection } from '@/components/shared';
import { PATHS } from '@/routes/paths';

export interface ProductListingProps {
  categorySlug: string;
}

/** Retail product listing — shared section scoped to the retail channel + routes. */
export const ProductListing: React.FC<ProductListingProps> = ({ categorySlug }) => (
  <ProductListingSection
    channel="RETAIL"
    categorySlug={categorySlug}
    hrefForProduct={(slug) => PATHS.RETAIL.PRODUCT(slug)}
    hrefForCategory={(slug) => PATHS.RETAIL.CATEGORY(slug)}
  />
);

ProductListing.displayName = 'ProductListing';
