'use client';

import * as React from 'react';
import { BrandsMarquee } from '@/components/shared';
import { usePartnerBrands } from '@/hooks';
import { WHOLESALE_BRANDS_TITLE } from '@/features/wholesale/constants';

export const PartnerBrandsStrip: React.FC<{ className?: string }> = ({ className }) => {
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
      ariaLabel="برندهای همکار"
      className={className}
      ctaClassName="shadow-primary-500 shadow-[0_0_100px_12px_rgba(0,172,172,0.5)] backdrop-blur-2xl"
    />
  );
};

PartnerBrandsStrip.displayName = 'PartnerBrandsStrip';
