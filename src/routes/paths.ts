import type { Channel } from '@/validations/primitives';

export type StorefrontSegment = 'retail' | 'wholesale';

const storePaths = (segment: StorefrontSegment) =>
  ({
    ROOT: `/${segment}`,
    CATEGORIES: `/${segment}/categories`,
    CATEGORY: (slug: string) => `/${segment}/category/${slug}`,
    CATEGORY_PRODUCTS: (slug: string) => `/${segment}/category/${slug}/products`,
    BEST_SELLERS: `/${segment}/best-sellers`,
    OFFERS: `/${segment}/offers`,
    FAVORITES: `/${segment}/favorites`,
    PRODUCT: (slug: string) => `/${segment}/${slug}`,
    SEARCH: `/${segment}/search`,
  }) as const;

export type DashboardRole = 'buyer';

/** Account-dashboard routes — one builder so every role gets the same shape. */
const dashboardPaths = (role: DashboardRole) =>
  ({
    ROOT: `/dashboard/${role}`,
    ORDERS: `/dashboard/${role}/orders`,
    ORDER: (id: string | number) => `/dashboard/${role}/orders/${id}`,
    FAVORITES: `/dashboard/${role}/favorites`,
    NOTIFICATIONS: `/dashboard/${role}/notifications`,
    REVIEWS: `/dashboard/${role}/reviews`,
    PROFILE: `/dashboard/${role}/profile`,
  }) as const;

export const PATHS = {
  ROOT: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOG: '/blog',

  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGIN_FOR: (channel?: Channel, returnTo?: string): string => {
      const params = new URLSearchParams({ channel: channel ?? 'RETAIL' });

      if (returnTo) {
        params.set('returnTo', returnTo);
      }

      return `/auth/login?${params.toString()}`;
    },
  },

  STORE: storePaths,

  WHOLESALE: storePaths('wholesale'),
  RETAIL: storePaths('retail'),

  DASHBOARD: {
    BUYER: dashboardPaths('buyer'),
  },

  CART: '/cart',
  CART_FOR: (channel?: Channel): string =>
    `/cart?${new URLSearchParams({ channel: channel ?? 'RETAIL' }).toString()}`,
} as const;
