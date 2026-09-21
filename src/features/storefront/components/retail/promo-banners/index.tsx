'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/ui';
import { RETAIL_PROMO_BANNERS } from '@/features/storefront/components/retail/constants';
import type { PromoBannersProps } from './types';

/**
 * Two equal-height promo banners under the weekly offers — white background,
 * main-site container, CSS grid with two equal columns and a fixed gap.
 * Tile data lives in the feature constants.
 */
export const PromoBanners: React.FC<PromoBannersProps> = ({
  tiles = RETAIL_PROMO_BANNERS,
  className,
}) => {
  if (tiles.length === 0) {
    return null;
  }

  return (
    <section aria-label="بنرهای ویژه" className={cn('my-14 md:my-20', className)}>
      <div className="container grid grid-cols-1 gap-6 py-10 md:grid-cols-2">
        {tiles.map(({ id, imageAlt, href, background }) => {
          const body = (
            <div
              className={cn(
                'rounded-9 relative flex h-44 w-full items-center justify-center overflow-hidden sm:h-52 lg:h-80',
              )}
              style={{ backgroundColor: background ?? 'var(--retail-tint-strong)' }}
            >
              {/* Banner artwork — awaiting final promo artwork assets */}
            </div>
          );

          return href ? (
            <Link key={id} href={href} aria-label={imageAlt ?? 'بنر ویژه'} className="block">
              {body}
            </Link>
          ) : (
            <div key={id}>{body}</div>
          );
        })}
      </div>
    </section>
  );
};

PromoBanners.displayName = 'PromoBanners';
