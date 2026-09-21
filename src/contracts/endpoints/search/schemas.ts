import { z } from 'zod';
import { ChannelSchema } from '@/validations';
import { ProductCardSchema, ProductSortSchema } from '@/contracts/endpoints/products/schemas';

/* =========================================================
   Search — suggestions
   ========================================================= */

export const SearchCategoryRefSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
});
export type SearchCategoryRef = z.infer<typeof SearchCategoryRefSchema>;

/** A suggested term that resolves directly to a category (e.g. «مرغ» → مواد غذایی). */
export const SearchCategorizedSuggestionSchema = z.object({
  text: z.string(),
  category: SearchCategoryRefSchema,
});
export type SearchCategorizedSuggestion = z.infer<typeof SearchCategorizedSuggestionSchema>;

export const SearchSuggestionsQuerySchema = z.object({
  /** Empty `q` → `{ categorized: [], terms: [] }` (show recents locally instead). */
  q: z.string().default(''),
});
export type SearchSuggestionsQuery = z.infer<typeof SearchSuggestionsQuerySchema>;

export const SearchSuggestionsResponseSchema = z.object({
  categorized: z.array(SearchCategorizedSuggestionSchema),
  /** Merges matching category names and published product names. */
  terms: z.array(z.string()),
});
export type SearchSuggestionsResponse = z.infer<typeof SearchSuggestionsResponseSchema>;

/* =========================================================
   Search — full results
   ========================================================= */

export const SearchQuerySchema = z.object({
  q: z.string().default(''),
  channel: ChannelSchema.default('RETAIL'),
  page: z.coerce.number().int().min(1).default(1),
  /** Max 50. */
  limit: z.coerce.number().int().min(1).max(50).default(20),
  sort: ProductSortSchema.default('relevant'),
  categoryId: z.coerce.number().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
});
export type SearchQuery = z.infer<typeof SearchQuerySchema>;

export const SearchCategoryHitSchema = z.object({
  slug: z.string(),
  name: z.string(),
  productCount: z.number(),
});
export type SearchCategoryHit = z.infer<typeof SearchCategoryHitSchema>;

export const SearchResponseSchema = z.object({
  query: z.string(),
  products: z.object({
    items: z.array(ProductCardSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
  }),
  categories: z.array(SearchCategoryHitSchema),
});
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
