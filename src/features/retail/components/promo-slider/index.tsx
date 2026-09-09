'use client';

import * as React from 'react';
import { ImageCarousel } from '@/components/shared';
import { RETAIL_NEXT_SECTION_ID, RETAIL_PROMO_SLIDES } from '@/features/retail/constants';

/**
 * Promotional banner carousel section — sits between the hero and the weekly
 * offers. A thin feature-level section that feeds the shared `ImageCarousel`
 * with the retail promo slides (data lives in the feature constants).
 *
 * Slide height follows the source banner ratio (1224×392 ≈ 32%) so the
 * artwork always fills the slide without cropping at any width.
 */
export const PromoSlider: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="container my-10">
      <ImageCarousel
        id={RETAIL_NEXT_SECTION_ID}
        images={RETAIL_PROMO_SLIDES}
        className={className}
        slideClassName="aspect-[1224/392] sm:aspect-[1224/392] lg:aspect-[1224/392] h-auto"
      />
    </div>
  );
};

PromoSlider.displayName = 'PromoSlider';
