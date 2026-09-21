'use client';

import * as React from 'react';
import { useProduct, useSellerOffers } from '@/hooks';
import { getStorefrontChannelByChannel } from '@/config/storefront';
import { toFaDigits } from '@/utils/format';
import { PRODUCT_IMAGE_FALLBACK } from '@/features/product/components/product-details/constants';
import type { BreadcrumbItem } from '@/components/shared/breadcrumb/types';
import type { ProductGalleryImage } from '@/components/shared/product-gallery/types';
import type { ProductDetail, SellerOffer, SellerOfferSort } from '@/contracts/endpoints/products';
import type { Channel } from '@/validations/primitives';

export interface ProductDetailsViewModel {
  product?: ProductDetail;
  isLoading: boolean;
  breadcrumbItems: BreadcrumbItem[];
  images: ProductGalleryImage[];
  /** Spec values shown as bullets under the title. */
  highlights: string[];
  startBadge?: string;
  endBadge?: string;
  offers: SellerOffer[];
  offersTotal: number;
  offersLoading: boolean;
  sort: SellerOfferSort;
  setSort: (sort: SellerOfferSort) => void;
  buyHref: string;
  bestSellersHref: string;
  /** Storefront `data-theme` value. */
  theme: string;
}

/**
 * Everything the PDP renders, derived from the product + its seller offers.
 * Kept beside the section (single consumer), per the feature-hook rule.
 */
export const useProductDetails = (channel: Channel, slug: string): ProductDetailsViewModel => {
  const config = getStorefrontChannelByChannel(channel);
  const [sort, setSort] = React.useState<SellerOfferSort>('cheapest');

  const productQuery = useProduct(slug, channel);
  const product = productQuery.data;
  const offersQuery = useSellerOffers(slug, { channel, sort }, product?.price);

  const images: ProductGalleryImage[] = !product
    ? []
    : product.gallery.length > 0
      ? product.gallery.map((image) => ({
          id: image.imageKey,
          src: image.url ?? PRODUCT_IMAGE_FALLBACK,
          alt: image.alt ?? product.name,
        }))
      : [{ src: product.imageUrl ?? PRODUCT_IMAGE_FALLBACK, alt: product.name }];

  return {
    product,
    isLoading: productQuery.isLoading,
    breadcrumbItems: product
      ? [
          { label: product.category.name, href: config.paths.CATEGORY(product.category.slug) },
          { label: product.name },
        ]
      : [],
    images,
    // The design lists bare spec values («۱.۵ لیتر»، «بسته ۶ عددی»), falling
    // back to the one-line description when a product carries no specs.
    highlights: product
      ? product.specs.length > 0
        ? product.specs.map((spec) => spec.value)
        : product.shortDescription
          ? [product.shortDescription]
          : []
      : [],
    startBadge: product?.badges[0],
    endBadge:
      product && product.discountPercent > 0
        ? `${toFaDigits(product.discountPercent)}٪ تخفیف`
        : undefined,
    offers: offersQuery.data?.items ?? [],
    offersTotal: offersQuery.data?.total ?? 0,
    offersLoading: offersQuery.isLoading,
    sort,
    setSort,
    buyHref: product ? config.paths.PRODUCT(product.slug) : config.paths.ROOT,
    bestSellersHref: config.paths.BEST_SELLERS,
    theme: config.segment,
  };
};
