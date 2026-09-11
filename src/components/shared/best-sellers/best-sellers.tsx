'use client';

import * as React from 'react';
import { CardSection, CardSectionSkeleton } from '@/components/shared/card-section';
import { useBestSellers } from '@/hooks';
import { BestSellersSectionProps } from './types';

const TITLE = 'پرفروش‌ترین‌ها';
const DESCRIPTION = 'حراج محصولات تا %55 تخفیف';

/**
 * Best-sellers section — wires the shared best-sellers query into the shared
 * CardSection. Storefront-agnostic: the caller scopes the view-all link and
 * the section spacing/background through props (landing, retail and wholesale
 * all render this with their own scope).
 */
export const BestSellersSection: React.FC<BestSellersSectionProps> = ({ link, className }) => {
  const bestSellersQuery = useBestSellers();
  const bestSellers = bestSellersQuery.data ?? [];

  if (bestSellersQuery.isLoading) {
    return <CardSectionSkeleton count={4} className={className} />;
  }

  return (
    <CardSection
      title={TITLE}
      description={DESCRIPTION}
      link={link}
      className={className}
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

BestSellersSection.displayName = 'BestSellersSection';
