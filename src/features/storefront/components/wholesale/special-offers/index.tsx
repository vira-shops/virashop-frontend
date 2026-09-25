'use client';

import * as React from 'react';
import { useBigOffers } from '@/hooks';
import { CampaignBanner, CampaignBannerSkeleton } from '@/components/shared';
import { PATHS } from '@/routes/paths';
import {
  SPECIAL_OFFERS_DURATION_MS,
  SPECIAL_OFFERS_ID,
  SPECIAL_OFFERS_SUBTITLE,
  SPECIAL_OFFERS_TITLE,
  SPECIAL_OFFERS_VIEW_ALL,
} from './constants';
import type { SpecialOffersProps } from './types';

export type { SpecialOffersProps } from './types';

export const SpecialOffers: React.FC<SpecialOffersProps> = ({
  viewAllHref = PATHS.WHOLESALE.OFFERS,
}) => {
  const offersQuery = useBigOffers();
  const offers = offersQuery.data ?? [];
  const [endsAt] = React.useState(() => Date.now() + SPECIAL_OFFERS_DURATION_MS);

  if (offersQuery.isLoading) {
    return <CampaignBannerSkeleton />;
  }

  return (
    <CampaignBanner
      id={SPECIAL_OFFERS_ID}
      title={SPECIAL_OFFERS_TITLE}
      subtitle={SPECIAL_OFFERS_SUBTITLE}
      endsAt={endsAt}
      viewAll={{ label: SPECIAL_OFFERS_VIEW_ALL, href: viewAllHref }}
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
  );
};

SpecialOffers.displayName = 'SpecialOffers';
