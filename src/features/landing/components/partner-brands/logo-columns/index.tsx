import * as React from 'react';
import { Fragment } from 'react';
import { cn } from '@/utils/ui';
import { PARTNER_BRAND_COLUMNS } from '@/features/landing/components/partner-brands/constants';
import { PartnerBrandsLogoColumnsProps } from './types';

const COLUMN_CLASS = 'flex md:flex-col gap-12 md:gap-8';

/** Staggered logo columns — layout driven by PARTNER_BRAND_COLUMNS. */
export const PartnerBrandsLogoColumns: React.FC<PartnerBrandsLogoColumnsProps> = ({
  count,
  renderSlot,
}) => {
  const slots = Array.from({ length: count }, (_, index) => index);

  return (
    <div className="absolute top-20 left-4 min-h-full md:-top-20">
      <div className="flex flex-col gap-2 md:flex-row md:gap-10">
        {PARTNER_BRAND_COLUMNS.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={cn(COLUMN_CLASS, column.justifyCenter && 'justify-center')}
          >
            {slots.slice(column.range[0], column.range[1]).map((slot) => (
              <Fragment key={slot}>{renderSlot(slot)}</Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

PartnerBrandsLogoColumns.displayName = 'PartnerBrandsLogoColumns';
