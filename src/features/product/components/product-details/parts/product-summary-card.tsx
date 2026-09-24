'use client';

import * as React from 'react';
import { Badge, Button, Typography } from '@/components/ui';
import { ProductGallery, ProductPriceBlock } from '@/components/shared';
import { HeartIcon, ScanIcon } from '@icons';
import { formatToman } from '@/utils/format';
import {
  CURRENCY_LABEL,
  PRICE_FROM_LABEL,
} from '@/features/product/components/product-details/constants';
import type { ProductGalleryImage } from '@/components/shared/product-gallery/types';
import type { WholesaleInfo } from '@/contracts/endpoints/products';

export interface ProductSummaryCardProps {
  name: string;
  images: ProductGalleryImage[];
  /** Short bullet facts under the title — the product's specs, values only. */
  highlights: string[];
  price: number;
  compareAtPrice: number | null;
  discountPercent: number;
  /** Top-start badge, e.g. «اقساط ۵ ماهه». */
  startBadge?: string;
  /** Top-end badge, e.g. «۲۰٪ تخفیف». */
  endBadge?: string;
  /** Wholesale tier/MOQ pricing — replaces the «قیمت از» row when present. */
  wholesale: WholesaleInfo | null;
  /**
   * Hides the price row. The selected-seller view moves the price into its
   * buy panel, so the card would otherwise print it twice. @default true
   */
  showPrice?: boolean;
}

/** Wishlist / compare — display-only until the accounts feature lands. */
const QuickAction: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <Button
    variant="ghost"
    size="xs"
    aria-label={label}
    className="rounded-6 size-9 p-0 text-gray-300 hover:bg-gray-50 hover:text-gray-700"
    icon={children}
  />
);

/**
 * The PDP headline block: badges above a white card holding the gallery, the
 * title with its spec bullets, and the «قیمت از» row.
 */
export const ProductSummaryCard: React.FC<ProductSummaryCardProps> = ({
  name,
  images,
  highlights,
  price,
  compareAtPrice,
  discountPercent,
  startBadge,
  endBadge,
  wholesale,
  showPrice = true,
}) => (
  <div className="flex flex-col gap-3">
    {(startBadge || endBadge) && (
      <div className="flex items-center justify-between gap-2 px-3">
        {startBadge && (
          <Badge variant="soft" color="warning-blue" size="sm" radius="sm">
            {startBadge}
          </Badge>
        )}
        {endBadge && (
          <Badge variant="soft" color="warning-green" size="sm" radius="sm">
            {endBadge}
          </Badge>
        )}
      </div>
    )}

    <div className="rounded-9 relative flex flex-col gap-6 bg-white p-5 shadow-sm md:flex-row md:items-start md:gap-8">
      {/* Pinned to the card's end corner, above everything, per the design. */}
      <div className="absolute top-5 left-5 z-10 flex flex-col gap-1">
        <QuickAction label="افزودن به علاقه‌مندی‌ها">
          <HeartIcon className="size-6" />
        </QuickAction>
        <QuickAction label="افزودن به مقایسه">
          <ScanIcon className="size-6" />
        </QuickAction>
      </div>

      <ProductGallery images={images} className="md:w-2/5 md:shrink-0" />

      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-col gap-4">
          <Typography variant="h6" className="text-gray-700">
            {name}
          </Typography>

          {highlights.length > 0 && (
            <ul className="flex flex-col gap-2">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-gray-300" />
                  <Typography variant="body-sm" className="text-gray-400">
                    {highlight}
                  </Typography>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!showPrice ? null : wholesale ? (
          <ProductPriceBlock
            price={price}
            compareAtPrice={compareAtPrice}
            discountPercent={discountPercent}
            wholesale={wholesale}
            formatPrice={formatToman}
            className="rounded-8 bg-gray-50 p-4"
          />
        ) : (
          <div className="rounded-8 flex items-center justify-between gap-4 bg-gray-50 px-4 py-3">
            <Typography variant="body-sm" className="text-gray-400">
              {PRICE_FROM_LABEL}
            </Typography>
            <Typography variant="body-md" className="text-primary">
              {formatToman(price)} {CURRENCY_LABEL}
            </Typography>
          </div>
        )}
      </div>
    </div>
  </div>
);

ProductSummaryCard.displayName = 'ProductSummaryCard';
