'use client';

import * as React from 'react';
import { BrandsMarquee } from '@/components/shared';
import { usePartnerBrands } from '@/hooks';
import {
  WHOLESALE_BRANDS_ARIA_LABEL,
  WHOLESALE_BRANDS_CTA_CLASS,
  WHOLESALE_BRANDS_ROW_COUNT,
  WHOLESALE_BRANDS_TITLE,
} from './constants';
import type { PartnerBrandsStripProps } from './types';

export const PartnerBrandsStrip: React.FC<PartnerBrandsStripProps> = ({ className }) => {
  const brandsQuery = usePartnerBrands();
  const brands = brandsQuery.data ?? [];

  return (
    <BrandsMarquee
      brands={brands.map((brand) => ({
        id: brand.id,
        logo: brand.logo,
        name: brand.name,
        logoAlt: brand.logoAlt,
      }))}
      ctaLabel={WHOLESALE_BRANDS_TITLE}
      ariaLabel={WHOLESALE_BRANDS_ARIA_LABEL}
      rowCount={WHOLESALE_BRANDS_ROW_COUNT}
      className={className}
      ctaClassName={WHOLESALE_BRANDS_CTA_CLASS}
    />
  );
};

PartnerBrandsStrip.displayName = 'PartnerBrandsStrip';
