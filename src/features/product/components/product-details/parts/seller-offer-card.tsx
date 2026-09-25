'use client';

import * as React from 'react';
import Image from 'next/image';
import { Badge, Button, Typography } from '@/components/ui';
import { ShopIcon } from '@icons';
import { formatJalaliDate, formatToman, toFaDigits } from '@/utils/format';
import {
  CURRENCY_LABEL,
  MORE_LABEL,
  PRODUCT_PARTS_COPY as COPY,
} from '@/features/product/components/product-details/constants';
import type {
  OfferChipProps,
  SellerOfferCardProps,
} from '@/features/product/components/product-details/types';

/** Small neutral pill used for every seller attribute in the design. */
const OfferChip: React.FC<OfferChipProps> = ({ children }) => (
  <Typography
    variant="caption-md"
    className="rounded-5 bg-gray-50 px-3 py-1 whitespace-nowrap text-gray-400"
  >
    {children}
  </Typography>
);

/** One row of «فروشنده ها» — who sells it, on what terms, at what price. */
export const SellerOfferCard: React.FC<SellerOfferCardProps> = ({ offer, href }) => {
  const chips = [
    offer.discountPercent > 0 ? COPY.discountChip(toFaDigits(offer.discountPercent)) : null,
    offer.installmentMonths ? COPY.installmentsChip(toFaDigits(offer.installmentMonths)) : null,
    offer.commissionPercent ? COPY.commissionChip(toFaDigits(offer.commissionPercent)) : null,
    offer.city,
    COPY.membershipChip(toFaDigits(offer.membershipYears)),
  ].filter((chip): chip is string => Boolean(chip));

  return (
    <article className="rounded-9 flex flex-col gap-4 border border-gray-100 bg-gray-50 p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-6 relative flex size-9 shrink-0 items-center justify-center overflow-hidden bg-gray-50 text-gray-300">
            {offer.seller.logoUrl ? (
              <Image
                src={offer.seller.logoUrl}
                alt=""
                fill
                sizes="20px"
                className="object-contain"
              />
            ) : (
              <ShopIcon className="size-6" aria-hidden="true" />
            )}
          </span>

          <Typography variant="h5" className="">
            {offer.seller.shopName}
          </Typography>

          {offer.isFeatured && (
            <Badge variant="fill" color="warning-red" size="xs" radius="sm">
              {COPY.featured}
            </Badge>
          )}
        </div>

        <Typography variant="body-xs" className="text-gray-400">
          {COPY.lastUpdated(formatJalaliDate(offer.updatedAt))}
        </Typography>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {chips.map((chip) => (
          <OfferChip key={chip}>{chip}</OfferChip>
        ))}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <Typography variant="caption-md" className="text-gray-400">
              {COPY.shippingType(offer.shippingType)}
            </Typography>
            <Typography variant="caption-md" className="text-gray-400">
              {COPY.stock(offer.stockLabel)}
            </Typography>
          </div>
          <Typography variant="body-md" className="text-primary">
            {formatToman(offer.price)} {CURRENCY_LABEL}
          </Typography>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="xs" href={href} className="text-gray-400">
            {MORE_LABEL}
          </Button>
          <Button variant="fill" color="primary" size="xs" href={href}>
            {COPY.buy}
          </Button>
        </div>
      </div>
    </article>
  );
};

SellerOfferCard.displayName = 'SellerOfferCard';
