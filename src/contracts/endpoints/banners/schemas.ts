import { z } from 'zod';
import { IDSchema } from '@/validations/primitives';

export const BigOfferItemSchema = z.object({
  id: IDSchema,
  image: z.string(),
  imageAlt: z.string(),
  title: z.string(),
  /** Top-right (RTL start) corner badge — e.g. "اقساط ۵ ماهه". */
  startBadge: z.string().optional(),
  /** Top-left (RTL end) discount badge — e.g. "۲۰٪ تخفیف". */
  endBadge: z.string().optional(),
  priceLabel: z.string().optional(),
  /** Pre-formatted price — e.g. "۴۵۰٬۰۰۰". */
  price: z.string().optional(),
  /** Availability note — e.g. "در ۷۲ فروشگاه". */
  stockNote: z.string().optional(),
  /** Buy-button label; when present the card renders the buy action. */
  actionLabel: z.string().optional(),
  href: z.string().optional(),
});

export type BigOfferItem = z.infer<typeof BigOfferItemSchema>;

export const BigOffersResponseSchema = z.array(BigOfferItemSchema);

export type BigOffersResponse = z.infer<typeof BigOffersResponseSchema>;

export const BestSellersItemSchema = BigOfferItemSchema;

export type BestSellersItem = z.infer<typeof BestSellersItemSchema>;

export const BestSellersResponseSchema = z.array(BestSellersItemSchema);

export type BestSellersResponse = z.infer<typeof BestSellersResponseSchema>;
