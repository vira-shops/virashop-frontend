'use client';

import * as React from 'react';
import { Skeleton, Typography } from '@/components/ui';
import { ProductPriceBlock, ProductGrid, ProductGallery, Breadcrumb } from '@/components/shared';
import { useProduct } from '@/hooks';
import { formatToman, toFaDigits } from '@/utils/format';
import { getStorefrontChannelByChannel } from '@/config/storefront';
import type { ProductCard } from '@/contracts/endpoints/products';
import type { ProductDetailsProps } from './types';

const STOCK_NOTE: Record<ProductCard['stockStatus'], string | undefined> = {
  IN_STOCK: undefined,
  LOW_STOCK: 'موجودی محدود',
  OUT_OF_STOCK: 'ناموجود',
};

export const ProductDetails: React.FC<ProductDetailsProps> = ({ channel, slug }) => {
  const config = getStorefrontChannelByChannel(channel);
  const productQuery = useProduct(slug, channel);

  if (productQuery.isLoading) {
    return (
      <div className="container flex flex-col gap-8 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Skeleton className="rounded-9 aspect-square w-full" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  const product = productQuery.data;

  if (!product) return null;

  const gallery =
    product.gallery.length > 0
      ? product.gallery.map((image) => ({
          id: image.imageKey,
          src: image.url ?? '/images/landing/big-offer/01.png',
          alt: image.alt ?? product.name,
        }))
      : [{ src: product.imageUrl ?? '/images/landing/big-offer/01.png', alt: product.name }];

  return (
    <div className="container flex flex-col gap-10 py-8">
      <Breadcrumb
        items={[
          { label: product.category.name, href: config.paths.CATEGORY(product.category.slug) },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ProductGallery images={gallery} />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Typography variant="h5" className="text-black">
              {product.name}
            </Typography>
            <Typography variant="caption-md" className="text-gray-300">
              فروشنده: {product.seller.shopName}
            </Typography>
          </div>

          <ProductPriceBlock
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            discountPercent={product.discountPercent}
            wholesale={product.wholesale}
            formatPrice={formatToman}
          />

          {STOCK_NOTE[product.stockStatus] && (
            <Typography
              variant="caption-md"
              className="rounded-5 w-fit bg-blue-100 px-9 py-1.5 text-gray-400"
            >
              {STOCK_NOTE[product.stockStatus]}
            </Typography>
          )}

          {product.shortDescription && (
            <Typography variant="body-sm" className="text-gray-700">
              {product.shortDescription}
            </Typography>
          )}

          {product.specs.length > 0 && (
            <div className="border-t border-dotted border-gray-200 pt-4">
              <Typography variant="body-sm" className="mb-2 text-gray-700">
                مشخصات
              </Typography>
              <dl className="flex flex-col gap-2">
                {product.specs.map((spec) => (
                  <div key={spec.key} className="flex items-center justify-between">
                    <dt>
                      <Typography variant="caption-md" className="text-gray-300">
                        {spec.label}
                      </Typography>
                    </dt>
                    <dd>
                      <Typography variant="caption-md" className="text-gray-700">
                        {spec.value}
                      </Typography>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {product.description && (
        <div className="flex flex-col gap-3">
          <Typography variant="h6" className="text-gray-900">
            توضیحات محصول
          </Typography>
          <Typography variant="body-sm" className="whitespace-pre-line text-gray-700">
            {product.description}
          </Typography>
        </div>
      )}

      {product.related.length > 0 && (
        <div className="flex flex-col gap-4">
          <Typography variant="h6" className="text-gray-900">
            محصولات مرتبط
          </Typography>
          <ProductGrid
            items={product.related.map((related) => ({
              id: related.id,
              image: {
                src: related.imageUrl ?? '/images/landing/big-offer/01.png',
                alt: related.name,
              },
              endBadge:
                related.discountPercent > 0 ? `${toFaDigits(related.discountPercent)}٪` : undefined,
              title: related.name,
              price: `${formatToman(related.price)} تومان`,
              stockNote: STOCK_NOTE[related.stockStatus],
              action: { label: 'مشاهده', href: config.paths.PRODUCT(related.slug) },
            }))}
          />
        </div>
      )}
    </div>
  );
};

ProductDetails.displayName = 'ProductDetails';
