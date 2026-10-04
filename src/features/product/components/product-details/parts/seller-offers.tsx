'use client';

import * as React from 'react';
import { Button, Skeleton, Tabs, Typography } from '@/components/ui';
import { toFaDigits } from '@/utils/format';
import { SellerOfferCard } from '@/features/product/components/product-details/parts/seller-offer-card';
import {
  SELLERS_TITLE,
  SELLER_OFFERS_VISIBLE,
  SELLER_SORT_OPTIONS,
  PRODUCT_PARTS_COPY as COPY,
} from '@/features/product/components/product-details/constants';
import type { SellerOfferSort } from '@/contracts/endpoints/products';
import type {
  SellerOffersHeaderProps,
  SellerOffersProps,
} from '@/features/product/components/product-details/types';
import { cn } from '@/utils/ui';

const SellerOffersSkeleton: React.FC = () => (
  <div className="flex flex-col gap-10">
    {Array.from({ length: SELLER_OFFERS_VISIBLE }, (_, index) => (
      <div
        key={index}
        className="rounded-8 flex flex-col gap-7 border border-gray-100 bg-gray-50 p-5"
      >
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-8 w-full" />
      </div>
    ))}
  </div>
);

/**
 * «فروشنده ها» + its sort tabs. It sits apart from the list: the design hangs
 * it at the foot of the product band, aligned to the product column.
 */
export const SellerOffersHeader: React.FC<SellerOffersHeaderProps> = ({
  sort,
  onSortChange,
  className,
}) => (
  <div className={cn('flex flex-col gap-3', className)}>
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
      className="w-fit"
    />
  </div>
);

SellerOffersHeader.displayName = 'SellerOffersHeader';

export const SellerOffers: React.FC<SellerOffersProps> = ({
  offers,
  total,
  isLoading,
  hrefForOffer,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const visible = showAll ? offers : offers.slice(0, SELLER_OFFERS_VISIBLE);

  const remaining = total - visible.length;
  const canExpand = offers.length > visible.length;

  return (
    <section aria-label={SELLERS_TITLE} className="flex flex-col gap-10 md:gap-13">
      {isLoading ? (
        <SellerOffersSkeleton />
      ) : (
        <div className="flex flex-col gap-10">
          {visible.map((offer) => (
            <SellerOfferCard key={offer.id} offer={offer} href={hrefForOffer(offer.id)} />
          ))}
        </div>
      )}

      {!isLoading && canExpand && remaining > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(true)}
          className="text-primary hover:text-primary-600 h-auto w-fit self-start p-0 hover:bg-transparent"
        >
          <Typography variant="caption-md" className="font-medium text-current">
            {COPY.moreSellers(toFaDigits(remaining))}
          </Typography>
        </Button>
      )}
    </section>
  );
};

SellerOffers.displayName = 'SellerOffers';
