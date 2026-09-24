'use client';

import * as React from 'react';
import { BrandsMarquee } from '@/components/shared';
import { Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import { usePartnerBrands } from '@/hooks';
import { RETAIL_POPULAR_BRANDS_TITLE } from '@/features/storefront/components/retail/constants';

/**
 * Popular brands showcase — reuses the shared `BrandsMarquee` (single row,
 * matching the retail look) instead of a bespoke duplicate ticker. Brand
 * logos come from the live `usePartnerBrands()` data, same as the wholesale
 * strip, rather than a static local list. Retail hides the center CTA and
 * uses smaller logo tiles than the wholesale strip.
 */
export const PopularBrands: React.FC<{ className?: string }> = ({ className }) => {
  const brandsQuery = usePartnerBrands();
  const brands = brandsQuery.data ?? [];

  return (
    <section
      aria-label={RETAIL_POPULAR_BRANDS_TITLE}
      className={cn('flex flex-col items-center gap-7 md:gap-10', className)}
    >
      <Typography variant="h3" as="h2" className="text-black">
        {RETAIL_POPULAR_BRANDS_TITLE}
      </Typography>

      {/* A single slim ticker row under the title — 48px on phones, 64px up. */}
      <BrandsMarquee
        brands={brands.map((brand) => ({
          id: brand.id,
          logo: brand.logo,
          name: brand.name,
          logoAlt: brand.logoAlt,
        }))}
        ctaLabel={RETAIL_POPULAR_BRANDS_TITLE}
        showCta={false}
        logoSize="sm"
        rowCount={1}
        className="h-13 md:h-14"
      />
    </section>
  );
};

PopularBrands.displayName = 'PopularBrands';
