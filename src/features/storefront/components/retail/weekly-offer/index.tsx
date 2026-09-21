'use client';

import * as React from 'react';
import { useBestSellers } from '@/hooks';
import { CampaignBanner, CampaignBannerSkeleton } from '@/components/shared';
import { PATHS } from '@/routes/paths';
import {
  WEEKLY_OFFERS_DURATION_MS,
  WEEKLY_OFFERS_SUBTITLE,
  WEEKLY_OFFERS_TITLE,
} from '@/features/storefront/components/retail/constants';

export const WeeklyOffers: React.FC = () => {
  const bestSellersQuery = useBestSellers();
  const bestSellers = bestSellersQuery.data ?? [];
  // Computed once per mount (lazy initializer), not at module load — a
  // module-scope `Date.now()` gets frozen into the static build output and
  // never advances, and would also mismatch between SSR and hydration.
  const [endsAt] = React.useState(() => Date.now() + WEEKLY_OFFERS_DURATION_MS);

  if (bestSellersQuery.isLoading) {
    return <CampaignBannerSkeleton />;
  }

  return (
    <section className="my-14 md:my-20">
      <CampaignBanner
        id="weekly-offers"
        title={WEEKLY_OFFERS_TITLE}
        subtitle={WEEKLY_OFFERS_SUBTITLE}
        endsAt={endsAt}
        viewAll={{ label: 'مشاهده همه', href: PATHS.RETAIL.OFFERS }}
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
