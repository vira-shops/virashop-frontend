'use client';

import * as React from 'react';
import { Skeleton } from '@/components/ui';
import { BestSellersSection, Breadcrumb } from '@/components/shared';
import {
  ProductBuyBar,
  ProductSummaryCard,
  SellerOfferView,
  SellerOffers,
  SellerOffersHeader,
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
      {selectedOfferId !== undefined ? (
        <section className="bg-gray-50">
          <div className="container flex flex-col gap-8 py-10 md:py-13">
            <Breadcrumb items={breadcrumbItems} className="hidden md:flex" />

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
          </div>
        </section>
      ) : (
        // One block, so the layout's section gap lands only before best sellers:
        // the gray product band (card column + seller tabs on its foot), then
        // the seller list on white.
        <div className="flex flex-col">
          <section className="bg-gray-50">
            <div className="container flex flex-col gap-7 pt-7 md:items-center md:pt-10">
              <Breadcrumb items={breadcrumbItems} className="hidden w-full md:flex" />

              <div className="flex w-full flex-col gap-[10px] md:w-[600px]">
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

              <SellerOffersHeader
                sort={sort}
                onSortChange={setSort}
                className="mt-6 w-full md:mt-10 md:w-[600px]"
              />
            </div>
          </section>

          <div className="container pt-10">
            <SellerOffers
              offers={offers}
              total={offersTotal}
              isLoading={offersLoading}
              hrefForOffer={hrefForOffer}
            />
          </div>
        </div>
      )}

      <BestSellersSection
        link={{ label: BEST_SELLERS_LINK_LABEL, href: bestSellersHref }}
        className="bg-gray-50 py-10 md:py-11"
      />
    </>
  );
};

ProductDetails.displayName = 'ProductDetails';
