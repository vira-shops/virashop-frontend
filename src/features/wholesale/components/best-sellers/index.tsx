'use client';

import * as React from 'react';
import { BestSellersSection } from '@/components/shared';
import { PATHS } from '@/routes/paths';

/** Wholesale best-sellers — shared section scoped to the wholesale look. */
export const BestSellers: React.FC = () => (
  <BestSellersSection
    link={{ label: 'مشاهده همه', href: PATHS.WHOLESALE.BEST_SELLERS }}
    className="my-11 sm:my-10"
  />
);

BestSellers.displayName = 'BestSellers';
