'use client';

import * as React from 'react';
import { BigOfferSection } from '@/components/shared';
import { PATHS } from '@/routes/paths';

/** Retail big-offer — shared section scoped to the retail look. */
export const BigOffer: React.FC = () => (
  <BigOfferSection
    link={{ label: 'مشاهده همه', href: PATHS.WHOLESALE.OFFERS }}
    className="my-14 bg-blue-50 sm:my-20"
  />
);

BigOffer.displayName = 'BigOffer';
