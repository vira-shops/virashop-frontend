'use client';

import * as React from 'react';
import { Typography } from '@/components/ui';
import { usePartnerBrands } from '@/hooks';
import { PARTNER_BRANDS_DESCRIPTION, PARTNER_BRANDS_TITLE } from './constants';
import { BrandLogoCard } from './brand-logo-card';
import { PartnerBrandsLogoColumns } from './logo-columns';
import { PartnerBrandsSkeleton } from './skeleton';
import { PartnerBrandsShell } from './shell';

export const PartnerBrands: React.FC = () => {
  const brandsQuery = usePartnerBrands();
  const brands = brandsQuery.data ?? [];

  if (brandsQuery.isLoading) {
    return <PartnerBrandsSkeleton />;
  }

  if (brands.length === 0) {
    return null;
  }

  return (
    <PartnerBrandsShell>
      <div className="flex flex-col items-center gap-3 lg:items-start lg:text-right">
        <div className="flex w-15 gap-2">
          <div className="bg-retail-500 h-0.5 w-full rounded-full" />
          <div className="bg-wholesale-500 h-0.5 w-full rounded-full" />
        </div>

        <Typography variant="h3" className="text-blue-900">
          {PARTNER_BRANDS_TITLE}
        </Typography>

        <Typography variant="body-md" className="text-center text-gray-700 md:text-right lg:mt-2">
          {PARTNER_BRANDS_DESCRIPTION}
        </Typography>
      </div>

      <PartnerBrandsLogoColumns
        count={brands.length}
        renderSlot={(slot) => {
          const brand = brands[slot];

          return brand ? <BrandLogoCard key={brand.id} brand={brand} /> : null;
        }}
      />
    </PartnerBrandsShell>
  );
};

PartnerBrands.displayName = 'PartnerBrands';
