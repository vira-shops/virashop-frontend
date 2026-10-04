'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CancelIcon, ShoppingCardGhostIcon } from '@icons';
import { Badge, Button, Typography } from '@/components/ui';
import { formatToman, toFaDigits } from '@/utils/format';
import { cn } from '@/utils/ui';
import { CURRENCY_LABEL, getBuyerChannel } from '@/features/buyer-dashboard/constants';
import {
  CARD_CLASS,
  FAVORITE_COPY as COPY,
  IMAGE_BOX_CLASS,
  PRICE_ROW_CLASS,
  SALE_ROW_CLASS,
  TITLE_CLASS,
} from './constants';
import { SaleCountdown } from './sale-countdown';
import type { FavoriteCardProps } from './types';

/**
 * One saved product: remove «×» and discount badge in the top corners, the
 * old price with the sale countdown, then the price with an icon cart button
 * — or «ناموجود» when it is out of stock. Every row has a fixed height, so
 * cards in a grid row always line up.
 */
export const FavoriteCard: React.FC<FavoriteCardProps> = ({ item, onRemove }) => {
  // The seller (and so the cart line) is picked on the product page.
  const href = getBuyerChannel(item.channel).productHref(item.productSlug);
  const onSale = item.inStock && item.originalPrice !== null;

  return (
    <article className={CARD_CLASS}>
      <Button
        variant="ghost"
        size="sm"
        fullRounded
        aria-label={COPY.remove}
        onClick={() => onRemove(item.id)}
        icon={<CancelIcon aria-hidden="true" className="size-7" />}
        className="hover:text-warning-red absolute top-3 left-3 z-10 text-blue-300 hover:bg-blue-50"
      />

      <div className={IMAGE_BOX_CLASS}>
        <Link href={href} tabIndex={-1} aria-hidden="true">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 768px) 88px, 240px"
            className="object-contain"
          />
        </Link>
        {/* On the image's corner, so it never covers the name. */}
        {item.discountPercent > 0 && (
          <Badge
            color="warning-green"
            size="xs"
            radius="sm"
            className="absolute top-0 right-0 z-10"
          >
            {COPY.discount(toFaDigits(item.discountPercent))}
          </Badge>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <Link href={href} className="hover:text-primary max-md:ps-9">
          <Typography variant="body-sm" as="h3" className={TITLE_CLASS}>
            {item.name}
          </Typography>
        </Link>

        <div className="mt-auto flex flex-col gap-3 md:border-t md:border-dashed md:border-blue-100 md:pt-5">
          {/* Reserved even when empty, so the price row sits at the same height on every card. */}
          <div className={SALE_ROW_CLASS}>
            {onSale && (
              <>
                <Typography variant="caption-md" as="del" className="text-blue-200">
                  {formatToman(item.originalPrice!)}
                </Typography>
                {item.saleEndsAt && <SaleCountdown endsAt={item.saleEndsAt} />}
              </>
            )}
          </div>

          {item.inStock ? (
            <div className={PRICE_ROW_CLASS}>
              <span className="flex items-baseline gap-1">
                <Typography variant="body-md" as="span" className="font-bold text-black">
                  {formatToman(item.price)}
                </Typography>
                <Typography variant="caption-md" as="span" className="text-gray-700">
                  {CURRENCY_LABEL}
                </Typography>
              </span>
              <Button
                href={href}
                size="sm"
                aria-label={COPY.addToCart}
                icon={<ShoppingCardGhostIcon aria-hidden="true" className="size-9" />}
                className="h-11 w-14 text-white"
              />
            </div>
          ) : (
            <Typography
              variant="body-md"
              as="p"
              className={cn(PRICE_ROW_CLASS, 'text-warning-red justify-center font-bold')}
            >
              {COPY.unavailable}
            </Typography>
          )}
        </div>
      </div>
    </article>
  );
};
