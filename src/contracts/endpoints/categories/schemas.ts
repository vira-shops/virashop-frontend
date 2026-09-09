import { z } from 'zod';
import { IDSchema } from '@/validations/primitives';

/** A product tile inside the category products grid. */
export const RetailProductSchema = z.object({
  id: IDSchema,
  title: z.string(),
  image: z.string(),
  imageAlt: z.string().default(''),
  href: z.string().optional(),
});

export type RetailProduct = z.infer<typeof RetailProductSchema>;

/** A leaf link inside a subcategory group (e.g. نان، ماکارونی under کالای اساسی). */
export const RetailSubcategoryItemSchema = z.object({
  id: IDSchema,
  title: z.string(),
  href: z.string().optional(),
});

export type RetailSubcategoryItem = z.infer<typeof RetailSubcategoryItemSchema>;

/**
 * A subcategory group (سرگروه) shown in the mega-menu content area and as a
 * nested accordion row in the mobile sidebar — carries its own leaf items.
 */
export const RetailSubcategorySchema = z.object({
  id: IDSchema,
  title: z.string(),
  href: z.string().optional(),
  /** Leaf links under this group. */
  items: z.array(RetailSubcategoryItemSchema),
});

export type RetailSubcategory = z.infer<typeof RetailSubcategorySchema>;

/**
 * A popular category in the mega-menu sidebar, with subcategory groups shown
 * in the content area when the item is hovered/active.
 */
export const PopularCategorySchema = z.object({
  id: IDSchema,
  slug: z.string(),
  title: z.string(),
  image: z.string(),
  imageAlt: z.string().default(''),
  /** Number of products available in this category — shown under the header title. */
  productCount: z.number().int().nonnegative(),
  href: z.string().optional(),
  /** Icon name mapped to a component from `@icons`. */
  icon: z.string().optional(),
  /** Subcategory groups (سرگروه‌ها) shown in the mega-menu content area. */
  subcategories: z.array(RetailSubcategorySchema),
  /** Products list — used by the mobile sidebar accordion. */
  products: z.array(RetailProductSchema),
});

export type PopularCategory = z.infer<typeof PopularCategorySchema>;

export const PopularCategoriesResponseSchema = z.array(PopularCategorySchema);
export type PopularCategoriesResponse = z.infer<typeof PopularCategoriesResponseSchema>;
