'use client';

import * as React from 'react';
import { CardSection, CardSectionSkeleton } from '@/components/shared';
import { useBestSellers } from '@/features/landing/hooks';
import { PATHS } from '@/routes/paths';

/** Wholesale best-sellers — shared CardSection with wholesale-scoped links. */
export const BestSellers: React.FC = () => {
  const bestSellersQuery = useBestSellers();
  const bestSellers = bestSellersQuery.data ?? [];

  if (bestSellersQuery.isLoading) {
    return <CardSectionSkeleton count={4} className="my-11 sm:my-10" />;
  }

  return (
    <CardSection
      title="پرفروش‌ترین‌ها"
      description="حراج محصولات تا %55 تخفیف"
      link={{ label: 'مشاهده همه', href: PATHS.WHOLESALE.BEST_SELLERS }}
      className="my-11 sm:my-10"
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

BestSellers.displayName = 'BestSellers';
