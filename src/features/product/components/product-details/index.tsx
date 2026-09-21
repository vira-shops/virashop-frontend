'use client';

import * as React from 'react';
import { Skeleton } from '@/components/ui';
import { BestSellersSection, Breadcrumb } from '@/components/shared';
import {
  ProductBuyBar,
  ProductSummaryCard,
  SellerOfferView,
  SellerOffers,
} from '@/features/product/components/product-details/parts';
import { useProductDetails } from '@/features/product/components/product-details/use-product-details';
import { BEST_SELLERS_LINK_LABEL } from '@/features/product/components/product-details/constants';
import type { ProductDetailsProps } from './types';

const ProductDetailsSkeleton: React.FC = () => (
  <div className="container flex flex-col gap-8 py-8">
    <div className="rounded-9 flex flex-col gap-8 bg-white p-5 shadow-sm md:flex-row">
      <Skeleton className="rounded-9 aspect-square w-full md:w-2/5" />
      <div className="flex flex-1 flex-col gap-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="rounded-8 h-12 w-full" />
      </div>
    </div>
    <Skeleton className="rounded-8 h-14 w-full" />
  </div>
);

export const ProductDetails: React.FC<ProductDetailsProps> = ({ channel, slug }) => {
  const {
    product,
    isLoading,
    breadcrumbItems,
    images,
    highlights,
    startBadge,
    endBadge,
    offers,
    offersTotal,
    offersLoading,
    sort,
    setSort,
    buyHref,
    bestSellersHref,
    selectedOfferId,
    selectedOffer,
    selectedOfferLoading,
    hrefForOffer,
    clearSelectedOffer,
    addSelectedOfferToCart,
  } = useProductDetails(channel, slug);

  if (isLoading) return <ProductDetailsSkeleton />;

  if (!product) return null;

  return (
    <>
      <div className="container flex flex-col gap-8 py-6 md:py-8">
        <Breadcrumb items={breadcrumbItems} className="hidden md:flex" />

        {selectedOfferId !== undefined ? (
          <SellerOfferView
            product={product}
            offer={selectedOffer}
            isLoading={selectedOfferLoading}
            images={images}
            highlights={highlights}
            startBadge={startBadge}
            endBadge={endBadge}
            onShowAllSellers={clearSelectedOffer}
            onAddToCart={addSelectedOfferToCart}
          />
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <ProductSummaryCard
                name={product.name}
                images={images}
                highlights={highlights}
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                discountPercent={product.discountPercent}
                startBadge={startBadge}
                endBadge={endBadge}
                wholesale={product.wholesale}
              />

              <ProductBuyBar
                shopName={product.seller.shopName}
                price={product.price}
                href={buyHref}
              />
            </div>

            <SellerOffers
              offers={offers}
              total={offersTotal}
              isLoading={offersLoading}
              sort={sort}
              onSortChange={setSort}
              hrefForOffer={hrefForOffer}
            />
          </>
        )}
      </div>

      <BestSellersSection
        link={{ label: BEST_SELLERS_LINK_LABEL, href: bestSellersHref }}
        className="bg-gray-50 py-6 md:py-8"
      />
    </>
  );
};

ProductDetails.displayName = 'ProductDetails';
