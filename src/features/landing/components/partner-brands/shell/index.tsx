import * as React from 'react';
import { PARTNER_BRANDS_ARIA_LABEL } from '@/features/landing/components/partner-brands/constants';
import { PartnerBrandsShellProps } from './types';

export const PartnerBrandsShell: React.FC<PartnerBrandsShellProps> = ({
  decorative = false,
  children,
}) => (
  <section
    aria-label={decorative ? undefined : PARTNER_BRANDS_ARIA_LABEL}
    aria-hidden={decorative || undefined}
    className="relative container max-md:mt-[56px] max-md:px-11"
  >
    <div className="rounded-9 min-h-88.5 items-center bg-blue-50 pt-8 pr-8 pl-8 md:flex md:pr-11 md:pl-2 lg:pt-0">
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-13 md:justify-between lg:flex-row lg:items-center">
        {children}
      </div>
    </div>
  </section>
);

PartnerBrandsShell.displayName = 'PartnerBrandsShell';
