'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/ui';
import {
  PROMO_BANNER_DEFAULT_BACKGROUND,
  PROMO_BANNER_FALLBACK_LABEL,
  PROMO_BANNERS_ARIA_LABEL,
  RETAIL_PROMO_BANNERS,
} from './constants';
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
    <section aria-label={PROMO_BANNERS_ARIA_LABEL} className={className}>
      <div className="container grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-10">
        {tiles.map(({ id, imageAlt, href, background }) => {
          const body = (
            <div
              className={cn(
                'rounded-9 relative flex aspect-[328/150] w-full items-center justify-center overflow-hidden md:aspect-[600/281]',
              )}
              style={{ backgroundColor: background ?? PROMO_BANNER_DEFAULT_BACKGROUND }}
            >
              {/* Banner artwork — awaiting final promo artwork assets */}
            </div>
          );

          return href ? (
            <Link
              key={id}
              href={href}
              aria-label={imageAlt ?? PROMO_BANNER_FALLBACK_LABEL}
              className="block"
            >
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
