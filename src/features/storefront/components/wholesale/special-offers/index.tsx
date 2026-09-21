'use client';

import * as React from 'react';
import { useBigOffers } from '@/hooks';
import { CampaignBanner, CampaignBannerSkeleton } from '@/components/shared';
import { PATHS } from '@/routes/paths';
import {
  SPECIAL_OFFERS_DURATION_MS,
  SPECIAL_OFFERS_SUBTITLE,
  SPECIAL_OFFERS_TITLE,
} from '@/features/storefront/components/wholesale/constants';

export const SpecialOffers: React.FC = () => {
  const offersQuery = useBigOffers();
  const offers = offersQuery.data ?? [];
  const [endsAt] = React.useState(() => Date.now() + SPECIAL_OFFERS_DURATION_MS);

  if (offersQuery.isLoading) {
    return <CampaignBannerSkeleton />;
  }

  return (
    <section className="my-14 md:my-20">
      <CampaignBanner
        id="special-offers"
        title={SPECIAL_OFFERS_TITLE}
        subtitle={SPECIAL_OFFERS_SUBTITLE}
        endsAt={endsAt}
        viewAll={{ label: 'مشاهده همه', href: PATHS.WHOLESALE.OFFERS }}
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
    </section>
  );
};

SpecialOffers.displayName = 'SpecialOffers';
