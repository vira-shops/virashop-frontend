export const PATHS = {
  ROOT: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  BLOG: '/blog',

  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },

  WHOLESALE: {
    ROOT: '/wholesale',
    CATEGORIES: '/wholesale/categories',
    CATEGORY: (slug: string) => `/wholesale/category/${slug}`,
    BEST_SELLERS: '/wholesale/best-sellers',
    OFFERS: '/wholesale/offers',
    PRODUCT: (slug: string) => `/wholesale/${slug}`,
  },

  RETAIL: {
    ROOT: '/retail',
    CATEGORIES: '/retail/categories',
    CATEGORY: (slug: string) => `/retail/category/${slug}`,
    BEST_SELLERS: '/retail/best-sellers',
    OFFERS: '/retail/offers',
    FAVORITES: '/retail/favorites',
    PRODUCT: (slug: string) => `/retail/${slug}`,
  },

  CART: '/cart',
} as const;
