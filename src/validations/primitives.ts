import { z } from 'zod';

/** Primitive schemas reused across the contracts layer. */

export const IDSchema = z
  .union([z.string(), z.number()])
  .transform((value) => (typeof value === 'number' ? String(value) : value));

export type ID = z.infer<typeof IDSchema>;

export const UUIDSchema = z.string().uuid();
export type UUID = z.infer<typeof UUIDSchema>;

export const SlugSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'invalid slug');
export type Slug = z.infer<typeof SlugSchema>;

export const EmailSchema = z.string().email();
export type Email = z.infer<typeof EmailSchema>;

export const MobileSchema = z.string().regex(/^(\+98|0)?9\d{9}$/, 'شماره موبایل نامعتبر است');
export type Mobile = z.infer<typeof MobileSchema>;

/** Storefront surface — shared by auth (signup channel) and products (price/catalog channel). */
export const ChannelSchema = z.enum(['RETAIL', 'WHOLESALE']);
export type Channel = z.infer<typeof ChannelSchema>;

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
