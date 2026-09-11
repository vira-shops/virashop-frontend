'use client';

import * as React from 'react';
import { BigOfferSection } from '@/components/shared';
import { PATHS } from '@/routes/paths';

/** Landing big-offer — shared section scoped to the landing look. */
export const BigOffer: React.FC = () => (
  <BigOfferSection
    link={{ label: 'مشاهده همه', href: PATHS.WHOLESALE.OFFERS }}
    className="my-11 bg-blue-50 sm:my-10"
  />
);

BigOffer.displayName = 'BigOffer';
