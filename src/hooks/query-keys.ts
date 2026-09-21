/** Centralized React Query keys (tuples, for hierarchical invalidation). */
export const queryKeys = {
  all: ['landing'] as const,
  auth: () => ['auth'] as const,
  authMe: () => [...queryKeys.auth(), 'me'] as const,
  banners: () => [...queryKeys.all, 'banners'] as const,
  bigOffers: () => [...queryKeys.banners(), 'big-offer'] as const,
  bestSellers: () => [...queryKeys.banners(), 'best-sellers'] as const,
  brands: () => [...queryKeys.all, 'brands'] as const,
  partnerBrands: () => [...queryKeys.brands(), 'partners'] as const,
  categories: () => [...queryKeys.all, 'categories'] as const,
  popularCategories: () => [...queryKeys.categories(), 'popular'] as const,
  categoryBrowse: (slug: string) => [...queryKeys.categories(), 'browse', slug] as const,
  products: () => [...queryKeys.all, 'products'] as const,
  productsList: (query: Record<string, unknown>) =>
    [...queryKeys.products(), 'list', query] as const,
  productDetail: (slug: string, channel: string) =>
    [...queryKeys.products(), 'detail', slug, channel] as const,
  posts: () => [...queryKeys.all, 'posts'] as const,
  techNews: () => [...queryKeys.posts(), 'tech-news'] as const,
  cities: () => [...queryKeys.all, 'cities'] as const,
  citiesList: () => [...queryKeys.cities(), 'list'] as const,
  stories: () => [...queryKeys.all, 'stories'] as const,
  activeStories: () => [...queryKeys.stories(), 'active'] as const,
  storefronts: () => [...queryKeys.all, 'storefronts'] as const,
  showcase: () => [...queryKeys.storefronts(), 'showcase'] as const,
  search: () => [...queryKeys.all, 'search'] as const,
  searchSuggestions: (q: string) => [...queryKeys.search(), 'suggestions', q] as const,
  searchResults: (query: Record<string, unknown>) =>
    [...queryKeys.search(), 'results', query] as const,
} as const;
