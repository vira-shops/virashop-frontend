export const RETAIL_CATEGORIES_TITLE = 'دستـــــــــــه بندی ها';
export const RETAIL_CATEGORIES_SUBTITLE = 'بیش از 5,000 محصول';
/** Tiles rendered in the hero's scrollable category row. */
export const RETAIL_CATEGORIES_COUNT = 8;
export const RETAIL_NEXT_SECTION_ID = 'promo-slider';
export const RETAIL_HERO_SEARCH_PLACEHOLDER = 'جستجو در ویرا شاپس';
export const RETAIL_POPULAR_BRANDS_TITLE = 'برندهای محبوب';

export const WEEKLY_OFFERS_TITLE = 'حراج هفتگی';
export const WEEKLY_OFFERS_SUBTITLE = 'حراج محصولات تا %55 تخفیف';
/** Countdown duration — the end timestamp is computed at render time, not here. */
export const WEEKLY_OFFERS_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export const RETAIL_PROMO_SLIDES = [
  {
    id: 'promo-1',
    src: '/images/landing/slider/slider-1.png',
    alt: 'کمپین ویژه فروشگاه ویراشاپس',
    href: '/retail/offers',
  },
  {
    id: 'promo-2',
    src: '/images/landing/slider/slider-2.png',
    alt: 'پیشنهاد شگفت‌انگیز',
    href: '/retail/best-sellers',
  },
  {
    id: 'promo-3',
    src: '/images/landing/slider/slider-3.png',
    alt: 'دسته‌های منتخب',
    href: '/retail/categories',
  },
] as const;

export const RETAIL_PROMO_BANNERS = [
  {
    id: 'banner-1',
    imageAlt: 'خرید از فروشگاه خرده ویراشاپس',
    href: '/retail',
    background: '#FFF7E6',
  },
  {
    id: 'banner-2',
    imageAlt: 'خرید عمده از ویراشاپس',
    href: '/wholesale',
    background: '#EAF7F7',
  },
] as const;
