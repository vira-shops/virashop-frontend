'use client';

import * as React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCartStore, useProduct, useSellerOffer, useSellerOffers } from '@/hooks';
import { useToast } from '@/components/feedback';
import { PATHS } from '@/routes/paths';
import { getStorefrontChannelByChannel } from '@/config/storefront';
import { toFaDigits } from '@/utils/format';
import {
  PRODUCT_IMAGE_FALLBACK,
  SELLER_PARAM,
} from '@/features/product/components/product-details/constants';
import type { ProductGalleryImage } from '@/components/shared/product-gallery/types';
import type { SellerOfferSort } from '@/contracts/endpoints/products';
import type { Channel } from '@/validations/primitives';
import type { ProductDetailsViewModel } from '@/features/product/components/product-details/types';

/**
 * Everything the PDP renders, derived from the product + its seller offers.
 * Kept beside the section (single consumer), per the feature-hook rule.
 */
export const useProductDetails = (channel: Channel, slug: string): ProductDetailsViewModel => {
  const config = getStorefrontChannelByChannel(channel);
  const router = useRouter();
  const toast = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const addLine = useCartStore((state) => state.addLine);
  const [sort, setSort] = React.useState<SellerOfferSort>('cheapest');

  const sellerParam = searchParams.get(SELLER_PARAM);
  const selectedOfferId = sellerParam ? Number(sellerParam) : undefined;

  const productQuery = useProduct(slug, channel);
  const product = productQuery.data;
  const offersQuery = useSellerOffers(slug, { channel, sort }, product?.price);
  const selectedOfferQuery = useSellerOffer(slug, selectedOfferId, { channel }, product?.price);

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
          {
            label: product.category.name,
            href: config.paths.CATEGORY_PRODUCTS(product.category.slug),
          },
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
    selectedOfferId,
    selectedOffer: selectedOfferQuery.data,
    selectedOfferLoading: selectedOfferQuery.isLoading,
    hrefForOffer: (offerId) => `${pathname}?${SELLER_PARAM}=${offerId}`,
    // Shallow, so picking and unpicking a seller never re-runs the route.
    clearSelectedOffer: () => window.history.pushState(null, '', pathname),
    addSelectedOfferToCart: () => {
      const offer = selectedOfferQuery.data;

      if (!product || !offer) return;

      addLine({
        productSlug: product.slug,
        name: product.name,
        imageUrl: product.imageUrl ?? null,
        seller: {
          id: offer.seller.id,
          shopName: offer.seller.shopName,
          logoUrl: offer.seller.logoUrl ?? null,
        },
        unitPrice: offer.price,
        commissionPercent: offer.commissionPercent ?? 0,
        // One pack by default; the cart step is where quantities get tuned.
        shrinks: 1,
        units: 0,
        prepayment: 0,
      });

      toast.success('به سبد خرید اضافه شد');
      router.push(PATHS.CART_FOR(channel));
    },
    theme: config.segment,
  };
};
