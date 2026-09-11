export const RETAIL_CATEGORIES_TITLE = 'دستـــــــــــه بندی ها';
export const RETAIL_CATEGORIES_SUBTITLE = 'بیش از 5,000 محصول';
export const RETAIL_CATEGORIES_MORE_LABEL = '...بیشتر';
export const RETAIL_CATEGORIES_MOBILE_COUNT = 8;
export const RETAIL_NEXT_SECTION_ID = 'promo-slider';
export const RETAIL_HERO_SEARCH_PLACEHOLDER = 'جستجو در ویرا شاپس';
export const RETAIL_POPULAR_BRANDS_TITLE = 'برندهای محبوب';

export const RETAIL_POPULAR_BRANDS = Array.from({ length: 11 }, (_, index) => ({
  id: `brand-${index + 1}`,
  logo: `/images/landing/brands/brand-${index + 1}.svg`,
  alt: `برند ${index + 1}`,
}));

export const RETAIL_POPULAR_BRANDS_SPEED_SECONDS = 40;

export const WEEKLY_OFFERS_TITLE = 'حراج هفتگی';
export const WEEKLY_OFFERS_SUBTITLE = 'حراج محصولات تا %55 تخفیف';
export const WEEKLY_OFFERS_ENDS_AT = Date.now() + 7 * 24 * 60 * 60 * 1000;
export const WEEKLY_OFFERS_VIEW_ALL_HREF = '/retail/offers';

export const RETAIL_PROMO_SLIDES = [
  {
    id: 'promo-1',
    src: '/images/landing/slider/slider-1.png',
    alt: 'کمپین ویژه فروشگاه ویرашاپ',
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
    image: '/images/landing/hero/retail.png',
    imageAlt: 'خرید از فروشگاه خرده ویراشاپ',
    href: '/retail',
    background: '#FFF7E6',
  },
  {
    id: 'banner-2',
    image: '/images/landing/hero/whole-sale.png',
    imageAlt: 'خرید عمده از ویراشاپ',
    href: '/wholesale',
    background: '#EAF7F7',
  },
] as const;
