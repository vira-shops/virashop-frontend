'use client';

import * as React from 'react';
import { ImageCarousel } from '@/components/shared';
import { RETAIL_NEXT_SECTION_ID } from '@/features/storefront/components/retail/constants';
import { PROMO_SLIDE_CLASS, RETAIL_PROMO_SLIDES } from './constants';
import type { PromoSliderProps } from './types';

/**
 * Promotional banner carousel section — sits between the hero and the weekly
 * offers. A thin feature-level section that feeds the shared `ImageCarousel`
 * with the retail promo slides.
 */
export const PromoSlider: React.FC<PromoSliderProps> = ({ className }) => (
  <div className="container">
    <ImageCarousel
      id={RETAIL_NEXT_SECTION_ID}
      images={[...RETAIL_PROMO_SLIDES]}
      className={className}
      slideClassName={PROMO_SLIDE_CLASS}
    />
  </div>
);

PromoSlider.displayName = 'PromoSlider';
