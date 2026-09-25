import { PATHS } from '@/routes/paths';
import type { PromoSlide } from './types';

export const RETAIL_PROMO_SLIDES: readonly PromoSlide[] = [
  {
    id: 'promo-1',
    src: '/images/landing/slider/slider-1.png',
    alt: 'کمپین ویژه فروشگاه ویراشاپس',
    href: PATHS.RETAIL.OFFERS,
  },
  {
    id: 'promo-2',
    src: '/images/landing/slider/slider-2.png',
    alt: 'پیشنهاد شگفت‌انگیز',
    href: PATHS.RETAIL.BEST_SELLERS,
  },
  {
    id: 'promo-3',
    src: '/images/landing/slider/slider-3.png',
    alt: 'دسته‌های منتخب',
    href: PATHS.RETAIL.CATEGORIES,
  },
];

/**
 * Slide height follows the source banner ratio (1224×392 ≈ 32%) so the
 * artwork always fills the slide without cropping at any width.
 */
export const PROMO_SLIDE_CLASS =
  'aspect-[1224/392] sm:aspect-[1224/392] lg:aspect-[1224/392] h-auto';
