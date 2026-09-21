import type { Channel } from '@/validations/primitives';

export type StorefrontSegment = 'retail' | 'wholesale';

/** One builder for both storefront channels — retail/wholesale route shape is defined once here. */
const storePaths = (segment: StorefrontSegment) =>
  ({
    ROOT: `/${segment}`,
    CATEGORIES: `/${segment}/categories`,
    CATEGORY: (slug: string) => `/${segment}/category/${slug}`,
    BEST_SELLERS: `/${segment}/best-sellers`,
    OFFERS: `/${segment}/offers`,
    FAVORITES: `/${segment}/favorites`,
    PRODUCT: (slug: string) => `/${segment}/${slug}`,
    SEARCH: `/${segment}/search`,
  }) as const;

export const PATHS = {
  ROOT: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOG: '/blog',

  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    /** Wizard entry href carrying the storefront channel context (`?channel=`). */
    LOGIN_FOR: (channel?: Channel, returnTo?: string): string => {
      const params = new URLSearchParams({ channel: channel ?? 'RETAIL' });

      if (returnTo) {
        params.set('returnTo', returnTo);
      }

      return `/auth/login?${params.toString()}`;
    },
  },

  /** Channel-generic route builder — new code should prefer `PATHS.STORE(segment)`. */
  STORE: storePaths,

  WHOLESALE: storePaths('wholesale'),
  RETAIL: storePaths('retail'),

  CART: '/cart',
  /**
   * Checkout entry carrying the storefront context (`?channel=`), so `/cart`
   * renders in the palette of the storefront the buyer came from — same
   * precedent as `AUTH.LOGIN_FOR`.
   */
  CART_FOR: (channel?: Channel): string =>
    `/cart?${new URLSearchParams({ channel: channel ?? 'RETAIL' }).toString()}`,
} as const;
