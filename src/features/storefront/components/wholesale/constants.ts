import type { FC, SVGProps } from 'react';
import { BottleIcon, CackeIcon, CheeseIcon, FishIcon, LeafIcon } from '@icons';

export const WHOLESALE_HERO_SEARCH_PLACEHOLDER = 'جستجو در ویرا شاپس';
export const WHOLESALE_HERO_ARIA_LABEL = 'بخش اصلی فروشگاه عمده';
export const WHOLESALE_CATEGORIES_SECTION_ID = 'wholesale-categories';
export const WHOLESALE_CATEGORIES_TITLE = 'دستـــــــــــه بندی ها';
export const WHOLESALE_CATEGORIES_SUBTITLE = 'بیش از 5,000 محصول';
export const WHOLESALE_CATEGORIES_SOON_LABEL = 'بزودی';

/** Category slug → icon for the wholesale category showcase tiles. */
export const CATEGORY_ICONS: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  food: BottleIcon,
  protein: FishIcon,
  dairy: CackeIcon,
  snacks: CheeseIcon,
  beverages: BottleIcon,
  detergents: LeafIcon,
  fruits: LeafIcon,
  sweets: CackeIcon,
};
export const WHOLESALE_BRANDS_TITLE = 'برنــــــد هایی که با ما همکاری کردند';
export const WHOLESALE_BRANDS_ARIA_LABEL = 'برندهای همکار';
export const WHOLESALE_BRANDS_ROW_COUNT = 3;
export const SPECIAL_OFFERS_TITLE = 'تخفیف های ویژه';
export const SPECIAL_OFFERS_SUBTITLE = 'حراج محصولات تا %55 تخفیف';
/** Countdown duration — the end timestamp is computed at render time, not here. */
export const SPECIAL_OFFERS_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
export const WHOLESALE_FEATURES_TITLE = 'ویــــــژگی های ویرا شاپس';
export const WHOLESALE_FEATURES_DESCRIPTION =
  'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است...';
export const WHOLESALE_FEATURES = [
  {
    id: 'secure',
    title: 'خرید امن و آسان',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است...',
  },
  {
    id: 'support',
    title: 'خرید امن و آسان',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است...',
  },
  {
    id: 'delivery',
    title: 'خرید امن و آسان',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است...',
  },
];
