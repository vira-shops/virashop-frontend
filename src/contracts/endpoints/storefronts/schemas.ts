import { z } from 'zod';

export const StorefrontButtonColorSchema = z.enum([
  'primary',
  'blue',
  'yellow',
  'wholesale',
  'retail',
]);

export type StorefrontButtonColor = z.infer<typeof StorefrontButtonColorSchema>;

export const StorefrontItemSchema = z.object({
  image: z.string(),
  imageAlt: z.string().optional(),
  buttonLabel: z.string(),
  buttonColor: StorefrontButtonColorSchema,
});

export type StorefrontItem = z.infer<typeof StorefrontItemSchema>;

/** Exactly two storefronts (wholesale + retail) — tuple keeps the type precise. */
export const StorefrontShowcaseResponseSchema = z.tuple([
  StorefrontItemSchema,
  StorefrontItemSchema,
]);

export type StorefrontShowcaseResponse = z.infer<typeof StorefrontShowcaseResponseSchema>;
