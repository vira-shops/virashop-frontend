'use client';

import * as React from 'react';
import { Button, Skeleton, Typography } from '@/components/ui';
import { OfferTable } from '@/features/product/components/product-details/parts/offer-table';
import { PurchaseAside } from '@/features/product/components/product-details/parts/purchase-aside';
import { ProductSummaryCard } from '@/features/product/components/product-details/parts/product-summary-card';
import { ViraCalculator } from '@/features/product/components/product-details/parts/vira-calculator';
import {
  ATTRIBUTES_TITLE,
  INSTALLMENTS_TITLE,
  MORE_LABEL,
  SHRINK_TITLE,
  TARIFFS_TITLE,
} from '@/features/product/components/product-details/constants';
import type { ProductGalleryImage } from '@/components/shared/product-gallery/types';
import type { OfferTableRow, SellerOfferDetail } from '@/contracts/endpoints/products';
import type { ProductDetail } from '@/contracts/endpoints/products';

export interface SellerOfferViewProps {
  product: ProductDetail;
  offer?: SellerOfferDetail;
  isLoading: boolean;
  images: ProductGalleryImage[];
  highlights: string[];
  startBadge?: string;
  endBadge?: string;
  /** Back to the full seller list. */
  onShowAllSellers: () => void;
}

const SellerOfferViewSkeleton: React.FC = () => (
  <div className="flex flex-col gap-6">
    {Array.from({ length: 3 }, (_, index) => (
      <div key={index} className="rounded-9 flex flex-col gap-4 bg-white p-5 shadow-sm">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    ))}
  </div>
);

/**
 * The PDP once a seller is chosen: that seller's full terms beside a buy
 * panel, replacing the «فروشنده ها» list.
 */
export const SellerOfferView: React.FC<SellerOfferViewProps> = ({
  product,
  offer,
  isLoading,
  images,
  highlights,
  startBadge,
  endBadge,
  onShowAllSellers,
}) => {
  /** The colours row prints swatches instead of a text value. */
  const renderAttributeValue = (row: OfferTableRow): React.ReactNode =>
    row.id === 'colors' && offer?.colors.length ? (
      <div className="flex items-center gap-2">
        {offer.colors.map((color) => (
          <span
            key={color}
            aria-hidden="true"
            className="size-5 rounded-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    ) : undefined;

  return (
    // DOM order is the mobile order (buy panel first); `flex-row-reverse`
    // flips it back on desktop so the terms sit on the start side.
    <div className="flex flex-col gap-6 lg:flex-row-reverse lg:items-start">
      <div className="flex w-full flex-col gap-4 lg:w-64 lg:shrink-0">
        <PurchaseAside price={offer?.price ?? product.price} />

        <Button
          variant="ghost"
          size="xs"
          onClick={onShowAllSellers}
          className="text-primary hover:text-primary-600 w-fit self-start p-0 hover:bg-transparent"
        >
          بازگشت به فهرست فروشندگان
        </Button>

        {offer && (
          <Typography variant="caption-md" className="text-gray-300">
            فروشنده: {offer.seller.shopName}
          </Typography>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <ProductSummaryCard
          name={product.name}
          images={images}
          highlights={highlights}
          price={offer?.price ?? product.price}
          compareAtPrice={product.compareAtPrice}
          discountPercent={product.discountPercent}
          startBadge={startBadge}
          endBadge={endBadge}
          wholesale={product.wholesale}
          // The price lives in the buy panel in this view.
          showPrice={false}
        />

        {isLoading || !offer ? (
          <SellerOfferViewSkeleton />
        ) : (
          <>
            <OfferTable title={TARIFFS_TITLE} rows={offer.tariffs} />
            <OfferTable title={INSTALLMENTS_TITLE} rows={offer.installmentRows} />
            <OfferTable title={SHRINK_TITLE} note={offer.shrinkNote} rows={offer.shrinkTiers} />
            <OfferTable
              title={ATTRIBUTES_TITLE}
              rows={offer.attributes}
              renderValue={renderAttributeValue}
              footer={
                <Button
                  variant="ghost"
                  size="xs"
                  className="text-primary hover:text-primary-600 p-0 hover:bg-transparent"
                >
                  {MORE_LABEL}
                </Button>
              }
            />
            <ViraCalculator calculator={offer.calculator} />
          </>
        )}
      </div>
    </div>
  );
};

SellerOfferView.displayName = 'SellerOfferView';
