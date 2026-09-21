'use client';

import * as React from 'react';
import { ProductDetailsSection } from '@/components/shared';
import { PATHS } from '@/routes/paths';

export interface ProductDetailsProps {
  slug: string;
}

/** Wholesale product details — shared section scoped to the wholesale channel + routes. */
export const ProductDetails: React.FC<ProductDetailsProps> = ({ slug }) => (
  <ProductDetailsSection
    channel="WHOLESALE"
    slug={slug}
    hrefForProduct={(productSlug) => PATHS.WHOLESALE.PRODUCT(productSlug)}
    hrefForCategory={(categorySlug) => PATHS.WHOLESALE.CATEGORY(categorySlug)}
  />
);

ProductDetails.displayName = 'ProductDetails';
