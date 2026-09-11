'use client';

import * as React from 'react';
import { useBestSellers } from '@/hooks';
import { CampaignBanner, CampaignBannerSkeleton } from '@/components/shared';
import {
  WEEKLY_OFFERS_ENDS_AT,
  WEEKLY_OFFERS_SUBTITLE,
  WEEKLY_OFFERS_TITLE,
  WEEKLY_OFFERS_VIEW_ALL_HREF,
} from '@/features/retail/constants';

export const WeeklyOffers: React.FC = () => {
  const bestSellersQuery = useBestSellers();
  const bestSellers = bestSellersQuery.data ?? [];

  if (bestSellersQuery.isLoading) {
    return <CampaignBannerSkeleton />;
  }

  return (
    <section className="my-14 md:my-20">
      <CampaignBanner
        id="weekly-offers"
        title={WEEKLY_OFFERS_TITLE}
        subtitle={WEEKLY_OFFERS_SUBTITLE}
        endsAt={WEEKLY_OFFERS_ENDS_AT}
        viewAll={{ label: '?????? ???', href: WEEKLY_OFFERS_VIEW_ALL_HREF }}
        items={bestSellers.map((bestSeller) => ({
          id: bestSeller.id,
          image: { src: bestSeller.image, alt: bestSeller.imageAlt },
          startBadge: bestSeller.startBadge,
          endBadge: bestSeller.endBadge,
          title: bestSeller.title,
          priceLabel: bestSeller.priceLabel,
          price: bestSeller.price,
          stockNote: bestSeller.stockNote,
          action: bestSeller.actionLabel
            ? { label: bestSeller.actionLabel, href: bestSeller.href }
            : undefined,
        }))}
      />
    </section>
  );
};

WeeklyOffers.displayName = 'WeeklyOffers';
