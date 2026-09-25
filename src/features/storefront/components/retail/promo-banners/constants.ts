import { PATHS } from '@/routes/paths';
import type { PromoBannerTile } from './types';

export const PROMO_BANNERS_ARIA_LABEL = 'بنرهای ویژه';
export const PROMO_BANNER_FALLBACK_LABEL = 'بنر ویژه';

/** Tile background when a tile sets none. */
export const PROMO_BANNER_DEFAULT_BACKGROUND = 'var(--retail-tint-strong)';

export const RETAIL_PROMO_BANNERS: readonly PromoBannerTile[] = [
  {
    id: 'banner-1',
    imageAlt: 'خرید از فروشگاه خرده ویراشاپس',
    href: PATHS.RETAIL.ROOT,
    background: '#FFF7E6',
  },
  {
    id: 'banner-2',
    imageAlt: 'خرید عمده از ویراشاپس',
    href: PATHS.WHOLESALE.ROOT,
    background: '#EAF7F7',
  },
];
