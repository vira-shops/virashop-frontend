'use client';

import * as React from 'react';
import { Button, Skeleton, Tabs, Typography } from '@/components/ui';
import { toFaDigits } from '@/utils/format';
import { SellerOfferCard } from '@/features/product/components/product-details/parts/seller-offer-card';
import {
  SELLERS_TITLE,
  SELLER_OFFERS_VISIBLE,
  SELLER_SORT_OPTIONS,
} from '@/features/product/components/product-details/constants';
import type { SellerOffer, SellerOfferSort } from '@/contracts/endpoints/products';

export interface SellerOffersProps {
  offers: SellerOffer[];
  /** Every seller carrying the product, including the ones not listed. */
  total: number;
  isLoading: boolean;
  sort: SellerOfferSort;
  onSortChange: (sort: SellerOfferSort) => void;
  /** Where a seller's «خرید»/«بیشتر» goes. */
  offerHref: string;
}

const SellerOffersSkeleton: React.FC = () => (
  <div className="flex flex-col gap-4">
    {Array.from({ length: SELLER_OFFERS_VISIBLE }, (_, index) => (
      <div key={index} className="rounded-9 flex flex-col gap-4 bg-white p-5 shadow-sm">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-8 w-full" />
      </div>
    ))}
  </div>
);

export const SellerOffers: React.FC<SellerOffersProps> = ({
  offers,
  total,
  isLoading,
  sort,
  onSortChange,
  offerHref,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const visible = showAll ? offers : offers.slice(0, SELLER_OFFERS_VISIBLE);

  const remaining = total - visible.length;
  const canExpand = offers.length > visible.length;

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Typography variant="h6" className="text-gray-700">
          {SELLERS_TITLE}
        </Typography>

        <Tabs
          variant="underline"
          color="primary"
          size="md"
          items={SELLER_SORT_OPTIONS.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          value={sort}
          onChange={(value) => onSortChange(value as SellerOfferSort)}
          aria-label={SELLERS_TITLE}
        />
      </div>

      {isLoading ? (
        <SellerOffersSkeleton />
      ) : (
        <div className="flex flex-col gap-4">
          {visible.map((offer) => (
            <SellerOfferCard key={offer.id} offer={offer} href={offerHref} />
          ))}
        </div>
      )}

      {!isLoading && canExpand && remaining > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(true)}
          className="text-primary hover:text-primary-600 w-fit self-start p-0 hover:bg-transparent"
        >
          نمایش {toFaDigits(remaining)} فروشگاه دیگر
        </Button>
      )}
    </section>
  );
};

SellerOffers.displayName = 'SellerOffers';
