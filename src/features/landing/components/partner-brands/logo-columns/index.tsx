import * as React from 'react';
import { Fragment } from 'react';
import { cn } from '@/utils/ui';
import {
  LOGO_COLUMN_CLASS,
  PARTNER_BRAND_COLUMNS,
} from '@/features/landing/components/partner-brands/constants';
import { PartnerBrandsLogoColumnsProps } from './types';

/** Staggered logo columns — layout driven by PARTNER_BRAND_COLUMNS. */
export const PartnerBrandsLogoColumns: React.FC<PartnerBrandsLogoColumnsProps> = ({
  count,
  renderSlot,
}) => {
  const slots = Array.from({ length: count }, (_, index) => index);

  return (
    <div className="left-4 md:-top-20 lg:absolute lg:min-h-full">
      <div className="flex flex-col gap-2 md:gap-10 lg:flex-row">
        {PARTNER_BRAND_COLUMNS.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={cn(LOGO_COLUMN_CLASS, column.justifyCenter && 'justify-center')}
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
