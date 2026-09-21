'use client';

import * as React from 'react';
import Image from 'next/image';
import { Badge, Button, Typography } from '@/components/ui';
import { ShopIcon } from '@icons';
import { formatJalaliDate, formatToman, toFaDigits } from '@/utils/format';
import { CURRENCY_LABEL } from '@/features/product/components/product-details/constants';
import type { SellerOffer } from '@/contracts/endpoints/products';

export interface SellerOfferCardProps {
  offer: SellerOffer;
  /** Opens this seller's full terms — the selected-seller view of the PDP. */
  href: string;
}

/** Small neutral pill used for every seller attribute in the design. */
const OfferChip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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
    offer.discountPercent > 0 ? `تخفیف ${toFaDigits(offer.discountPercent)}٪` : null,
    offer.installmentMonths ? `اقساط ${toFaDigits(offer.installmentMonths)} ماهه` : null,
    offer.commissionPercent ? `کارمزد ${toFaDigits(offer.commissionPercent)}٪` : null,
    offer.city,
    `${toFaDigits(offer.membershipYears)} سال عضویت`,
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
              ویژه
            </Badge>
          )}
        </div>

        <Typography variant="body-xs" className="text-gray-400">
          آخرین تغییرات {formatJalaliDate(offer.updatedAt)}
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
              نوع ارسال: {offer.shippingType}
            </Typography>
            <Typography variant="caption-md" className="text-gray-400">
              موجودی: {offer.stockLabel}
            </Typography>
          </div>
          <Typography variant="body-md" className="text-primary font-bold">
            {formatToman(offer.price)} {CURRENCY_LABEL}
          </Typography>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="xs" href={href} className="text-gray-400">
            بیشتر
          </Button>
          <Button variant="fill" color="primary" size="xs" href={href}>
            خرید
          </Button>
        </div>
      </div>
    </article>
  );
};

SellerOfferCard.displayName = 'SellerOfferCard';
