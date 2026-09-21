'use client';

import * as React from 'react';
import { ProductDetailsSection } from '@/components/shared';
import { PATHS } from '@/routes/paths';

export interface ProductDetailsProps {
  slug: string;
}

/** Retail product details — shared section scoped to the retail channel + routes. */
export const ProductDetails: React.FC<ProductDetailsProps> = ({ slug }) => (
  <ProductDetailsSection
    channel="RETAIL"
    slug={slug}
    hrefForProduct={(productSlug) => PATHS.RETAIL.PRODUCT(productSlug)}
    hrefForCategory={(categorySlug) => PATHS.RETAIL.CATEGORY(categorySlug)}
  />
);

ProductDetails.displayName = 'ProductDetails';
