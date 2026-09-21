import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
import { CATEGORY_LIST, CATEGORY_TREE_MOCK } from '@/contracts/endpoints/categories/contract';
import { PRODUCTS_MOCK } from '@/contracts/endpoints/products/contract';
import {
  SearchQuerySchema,
  SearchResponseSchema,
  SearchSuggestionsQuerySchema,
  SearchSuggestionsResponseSchema,
  type SearchQuery,
  type SearchResponse,
  type SearchSuggestionsResponse,
} from './schemas';

const CATEGORY_ID_BY_SLUG = new Map(CATEGORY_TREE_MOCK.map((node) => [node.slug, node.id]));

/**
 * Mock-mode suggestion builder — the static contract `mockData` below can't
 * key off the requested `q` (same limitation as everywhere else in this
 * codebase), so `use-search-suggestions.ts` calls this directly instead.
 */
export const buildSearchSuggestionsMock = (q: string): SearchSuggestionsResponse => {
  const term = q.trim().toLowerCase();

  if (!term) return { categorized: [], terms: [] };

  const categorized = CATEGORY_LIST.filter((category) => category.title.includes(term)).map(
    (category) => ({
      text: category.title,
      category: {
        id: CATEGORY_ID_BY_SLUG.get(category.slug) ?? 0,
        slug: category.slug,
        name: category.title,
      },
    }),
  );

  const matchingProducts = PRODUCTS_MOCK.filter((product) =>
    product.name.toLowerCase().includes(term),
  );
  const terms = Array.from(new Set(matchingProducts.map((product) => product.name))).slice(0, 8);

  return { categorized: categorized.slice(0, 5), terms };
};

/** Mock-mode full-search builder — mirrors `use-products.ts`'s client-side filtering. */
export const buildSearchMock = (query: SearchQuery): SearchResponse => {
  const term = query.q.trim().toLowerCase();
  let items = PRODUCTS_MOCK.filter((product) => product.channel === 'RETAIL');

  if (term) {
    items = items.filter((product) => product.name.toLowerCase().includes(term));
  }

  if (query.sort === 'cheapest') {
    items = [...items].sort((a, b) => a.price - b.price);
  } else if (query.sort === 'expensive') {
    items = [...items].sort((a, b) => b.price - a.price);
  } else if (query.sort === 'newest') {
    items = [...items].reverse();
  } else if (query.sort === 'bestselling') {
    items = [...items].sort((a, b) => b.storeCount - a.storeCount);
  } else if (query.sort === 'discounted') {
    items = items
      .filter((product) => product.discountPercent > 0)
      .sort((a, b) => b.discountPercent - a.discountPercent);
  }

  const total = items.length;
  const start = (query.page - 1) * query.limit;
  const page = items
    .slice(start, start + query.limit)
    .map((product) => ({ ...product, channel: query.channel }));

  const categories = term
    ? CATEGORY_LIST.filter((category) => category.title.includes(term)).map((category) => ({
        slug: category.slug,
        name: category.title,
        productCount: category.productCount,
      }))
    : [];

  return {
    query: query.q,
    products: { items: page, total, page: query.page, limit: query.limit },
    categories,
  };
};

const SAMPLE_SUGGESTIONS_MOCK = buildSearchSuggestionsMock('مرغ');
const SAMPLE_SEARCH_MOCK = buildSearchMock({
  q: 'مرغ',
  channel: 'RETAIL',
  page: 1,
  limit: 20,
  sort: 'relevant',
});

export const searchContracts = {
  search: {
    /** `GET /search/suggestions?q=` — autocomplete for the search overlay. */
    getSuggestions: {
      method: 'GET',
      path: '/search/suggestions',
      request: SearchSuggestionsQuerySchema,
      response: apiResponseWrapper(SearchSuggestionsResponseSchema),
      mockData: mockDataWrapper(SAMPLE_SUGGESTIONS_MOCK),
    },

    /** `GET /search?q=&page=&limit=&sort=&categoryId=&minPrice=&maxPrice=&channel=` */
    search: {
      method: 'GET',
      path: '/search',
      request: SearchQuerySchema,
      response: apiResponseWrapper(SearchResponseSchema),
      mockData: mockDataWrapper(SAMPLE_SEARCH_MOCK),
    },
  },
} as const satisfies Contracts;
