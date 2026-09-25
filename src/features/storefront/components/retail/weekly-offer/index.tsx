'use client';

import * as React from 'react';
import { useBestSellers } from '@/hooks';
import { CampaignBanner, CampaignBannerSkeleton } from '@/components/shared';
import { PATHS } from '@/routes/paths';
import {
  WEEKLY_OFFERS_DURATION_MS,
  WEEKLY_OFFERS_ID,
  WEEKLY_OFFERS_SUBTITLE,
  WEEKLY_OFFERS_TITLE,
  WEEKLY_OFFERS_VIEW_ALL,
} from './constants';
import type { WeeklyOffersProps } from './types';

export type { WeeklyOffersProps } from './types';

export const WeeklyOffers: React.FC<WeeklyOffersProps> = ({
  viewAllHref = PATHS.RETAIL.OFFERS,
}) => {
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
    <CampaignBanner
      id={WEEKLY_OFFERS_ID}
      title={WEEKLY_OFFERS_TITLE}
      subtitle={WEEKLY_OFFERS_SUBTITLE}
      endsAt={endsAt}
      viewAll={{ label: WEEKLY_OFFERS_VIEW_ALL, href: viewAllHref }}
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
  );
};

WeeklyOffers.displayName = 'WeeklyOffers';
