'use client';

import * as React from 'react';
import { CardSection, CardSectionSkeleton } from '@/components/shared/card-section';
import { useBigOffers } from '@/hooks';
import { BigOfferSectionProps } from './types';

const TITLE = 'تخفیف بزرگ';
const DESCRIPTION = 'حراج محصولات تا %55 تخفیف';

/**
 * Big-offer section — wires the shared big-offers query into the shared
 * CardSection. Storefront-agnostic: the caller scopes the view-all link and
 * the section spacing/background through props (landing and retail render it
 * with their own scope).
 */
export const BigOfferSection: React.FC<BigOfferSectionProps> = ({ link, className }) => {
  const offersQuery = useBigOffers();
  const offers = offersQuery.data ?? [];

  if (offersQuery.isLoading) {
    return <CardSectionSkeleton count={4} className={className} />;
  }

  return (
    <CardSection
      title={TITLE}
      description={DESCRIPTION}
      link={link}
      className={className}
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

BigOfferSection.displayName = 'BigOfferSection';
