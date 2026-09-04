import * as React from 'react';
import { Skeleton } from '@/components/ui';
import { PARTNER_BRAND_COLUMNS } from './constants';
import { PartnerBrandsLogoColumns } from './logo-columns';
import { PartnerBrandsShell } from './shell';

export const PartnerBrandsSkeleton: React.FC = () => (
  <PartnerBrandsShell decorative>
    <div className="flex flex-col items-center md:items-start md:text-right">
      <Skeleton className="h-0.5 w-15 rounded-full" />
      <Skeleton className="mt-4 h-6 w-56" />
      <Skeleton className="h-4 w-80 md:mt-2" />
    </div>

    <PartnerBrandsLogoColumns
      count={PARTNER_BRAND_COLUMNS.reduce((sum, { range }) => sum + (range[1] ?? 0) - range[0], 0)}
      renderSlot={() => <Skeleton className="rounded-8 h-14 w-14 md:h-28 md:w-28" />}
    />
  </PartnerBrandsShell>
);

PartnerBrandsSkeleton.displayName = 'PartnerBrandsSkeleton';
