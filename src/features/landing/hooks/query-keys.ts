/** Centralized React Query keys (tuples, for hierarchical invalidation). */
export const landingQueryKeys = {
  all: ['landing'] as const,
  banners: () => [...landingQueryKeys.all, 'banners'] as const,
  bigOffers: () => [...landingQueryKeys.banners(), 'big-offer'] as const,
  bestSellers: () => [...landingQueryKeys.banners(), 'best-sellers'] as const,
  brands: () => [...landingQueryKeys.all, 'brands'] as const,
  partnerBrands: () => [...landingQueryKeys.brands(), 'partners'] as const,
  categories: () => [...landingQueryKeys.all, 'categories'] as const,
  popularCategories: () => [...landingQueryKeys.categories(), 'popular'] as const,
  posts: () => [...landingQueryKeys.all, 'posts'] as const,
  techNews: () => [...landingQueryKeys.posts(), 'tech-news'] as const,
  cities: () => [...landingQueryKeys.all, 'cities'] as const,
  citiesList: () => [...landingQueryKeys.cities(), 'list'] as const,
  stories: () => [...landingQueryKeys.all, 'stories'] as const,
  activeStories: () => [...landingQueryKeys.stories(), 'active'] as const,
  storefronts: () => [...landingQueryKeys.all, 'storefronts'] as const,
  showcase: () => [...landingQueryKeys.storefronts(), 'showcase'] as const,
} as const;
