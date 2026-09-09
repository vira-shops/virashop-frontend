'use client';

import * as React from 'react';
import { useBigOffers } from '@/features/landing/hooks';
import { CampaignBanner, CampaignBannerSkeleton } from '@/components/shared';
import { PATHS } from '@/routes/paths';
import { SPECIAL_OFFERS_ENDS_AT, SPECIAL_OFFERS_SUBTITLE } from '@/features/wholesale/constants';

/**
 * Wholesale special offers — wires the big-offers data into the shared
 * CampaignBanner with wholesale-scoped links.
 */
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
        title="تخفیف های ویژه"
        subtitle={SPECIAL_OFFERS_SUBTITLE}
        endsAt={SPECIAL_OFFERS_ENDS_AT}
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
