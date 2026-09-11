'use client';

import * as React from 'react';
import { useBigOffers } from '@/hooks';
import { CampaignBanner, CampaignBannerSkeleton } from '@/components/shared';
import { PATHS } from '@/routes/paths';
import { SPECIAL_OFFERS_ENDS_AT, SPECIAL_OFFERS_SUBTITLE } from '@/features/wholesale/constants';

export const SpecialOffers: React.FC = () => {
  const offersQuery = useBigOffers();
  const offers = offersQuery.data ?? [];

  if (offersQuery.isLoading) {
    return <CampaignBannerSkeleton />;
  }

  return (
    <section className="my-14 md:my-20">
      <CampaignBanner
        id="special-offers"
        title="????? ??? ????"
        subtitle={SPECIAL_OFFERS_SUBTITLE}
        endsAt={SPECIAL_OFFERS_ENDS_AT}
        viewAll={{ label: '?????? ???', href: PATHS.WHOLESALE.OFFERS }}
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
