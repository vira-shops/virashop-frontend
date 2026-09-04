import { z } from 'zod';
import { IDSchema } from '@/validations/primitives';

export const TechNewsItemSchema = z.object({
  id: IDSchema,
  image: z.string(),
  imageAlt: z.string().optional(),
  title: z.string(),
  /** Short teaser shown under the title. */
  excerpt: z.string(),
  href: z.string().optional(),
});

export type TechNewsItem = z.infer<typeof TechNewsItemSchema>;

export const TechNewsResponseSchema = z.array(TechNewsItemSchema);

export type TechNewsResponse = z.infer<typeof TechNewsResponseSchema>;
