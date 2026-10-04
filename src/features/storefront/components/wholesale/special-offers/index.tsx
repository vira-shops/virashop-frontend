'use client';

import * as React from 'react';
import { useBigOffers } from '@/hooks';
import { CardSection, CardSectionSkeleton } from '@/components/shared';
import { PATHS } from '@/routes/paths';
import { cn } from '@/utils/ui';
import {
  SPECIAL_OFFERS_ID,
  SPECIAL_OFFERS_SUBTITLE,
  SPECIAL_OFFERS_TITLE,
  SPECIAL_OFFERS_VIEW_ALL,
} from './constants';
import type { SpecialOffersProps } from './types';

export type { SpecialOffersProps } from './types';

/** Shared band skin: the design draws wholesale offers on the pale blue band, 32px tall padding. */
const BAND_CLASS = 'bg-blue-50 py-11';

/**
 * «تخفیف های ویژه» — wholesale draws it as a plain product band (title,
 * subtitle, view-all), not the countdown campaign retail uses for its weekly sale.
 */
export const SpecialOffers: React.FC<SpecialOffersProps> = ({
  viewAllHref = PATHS.WHOLESALE.OFFERS,
}) => {
  const offersQuery = useBigOffers();
  const offers = offersQuery.data ?? [];

  if (offersQuery.isLoading) {
    return <CardSectionSkeleton count={4} className={BAND_CLASS} />;
  }

  return (
    <div id={SPECIAL_OFFERS_ID}>
      <CardSection
        title={SPECIAL_OFFERS_TITLE}
        description={SPECIAL_OFFERS_SUBTITLE}
        link={{ label: SPECIAL_OFFERS_VIEW_ALL, href: viewAllHref }}
        className={cn(BAND_CLASS)}
        items={offers.map((offer) => ({
          id: offer.id,
          image: { src: offer.image, alt: offer.imageAlt },
          startBadge: offer.startBadge,
          endBadge: offer.endBadge,
          title: offer.title,
          priceLabel: offer.priceLabel,
          price: offer.price,
          stockNote: offer.stockNote,
          action: offer.actionLabel ? { label: offer.actionLabel, href: offer.href } : undefined,
        }))}
      />
    </div>
  );
};

SpecialOffers.displayName = 'SpecialOffers';
