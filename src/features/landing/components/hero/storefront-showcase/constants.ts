import { PATHS } from '@/routes/paths';

export const SHOWCASE_ARIA_LABEL = 'بخش فروشگاه‌ها';

export const SHOWCASE_IMAGE_SIZES = '(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 460px';

/** Each showcase card's button leads to its storefront. */
export const STOREFRONT_HREF: Record<string, string> = {
  retail: PATHS.RETAIL.ROOT,
  wholesale: PATHS.WHOLESALE.ROOT,
};
