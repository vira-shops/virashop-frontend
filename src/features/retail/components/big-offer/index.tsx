'use client';

import * as React from 'react';
import { CardSection, CardSectionSkeleton } from '@/components/shared';
import { useBigOffers } from '@/features/landing/hooks';
import { PATHS } from '@/routes/paths';

export const BigOffer: React.FC = () => {
  const offersQuery = useBigOffers();
  const offers = offersQuery.data ?? [];

  if (offersQuery.isLoading) {
    return <CardSectionSkeleton count={4} className="my-11 bg-blue-50 sm:my-10" />;
  }

  return (
    <CardSection
      title="تخفیف بزرگ"
      description="حراج محصولات تا %55 تخفیف"
      link={{ label: 'مشاهده همه', href: PATHS.WHOLESALE.OFFERS }}
      className="my-14 bg-blue-50 sm:my-20"
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

BigOffer.displayName = 'BigOffer';
