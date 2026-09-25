import { z } from 'zod';
import { ChannelSchema } from '@/validations';

export const FavoriteProductSchema = z.object({
  id: z.number(),
  productSlug: z.string(),
  /** Which storefront the product was saved from — builds its link. */
  channel: ChannelSchema,
  name: z.string(),
  image: z.string(),
  /** Tomans. */
  price: z.number(),
  /** Tomans before discount; `null` when not discounted. */
  originalPrice: z.number().nullable(),
});
export type FavoriteProduct = z.infer<typeof FavoriteProductSchema>;

export const FavoritesListResponseSchema = z.array(FavoriteProductSchema);
export type FavoritesListResponse = z.infer<typeof FavoritesListResponseSchema>;
