import { z } from 'zod';
import { ChannelSchema, IDSchema } from '@/validations/primitives';

/** `GET /categories/popular` query — hrefs in the response are built for this channel. */
export const PopularCategoriesQuerySchema = z.object({
  channel: ChannelSchema.default('RETAIL'),
});
export type PopularCategoriesQuery = z.infer<typeof PopularCategoriesQuerySchema>;

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

/**
 * Real backend category tree (`GET /categories/tree`, `GET /categories/:slug`)
 * — a separate, recursive shape from `PopularCategorySchema` above (which
 * backs the not-yet-backend-integrated mega-menu mock). Used by the product
 * listing page for its breadcrumb + category icon row.
 */
export interface CategoryTreeNode {
  id: number;
  slug: string;
  name: string;
  nameFa: string;
  nameEn: string;
  parentId: number | null;
  depth: number;
  iconKey: string | null;
  imageKey: string | null;
  sortOrder: number;
  productCount: number;
  children: CategoryTreeNode[];
}

/** Node summary shape (no `children`) — used inside `ancestors`/`children` on the browse endpoint. */
export const CategorySummarySchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  nameFa: z.string(),
  nameEn: z.string(),
  parentId: z.number().nullable(),
  depth: z.number(),
  iconKey: z.string().nullable(),
  imageKey: z.string().nullable(),
  sortOrder: z.number(),
  productCount: z.number(),
});
export type CategorySummary = z.infer<typeof CategorySummarySchema>;

export const CategoryTreeNodeSchema: z.ZodType<CategoryTreeNode> = z.lazy(() =>
  CategorySummarySchema.extend({
    children: z.array(CategoryTreeNodeSchema),
  }),
);

export const CategoryTreeResponseSchema = z.array(CategoryTreeNodeSchema);
export type CategoryTreeResponse = z.infer<typeof CategoryTreeResponseSchema>;

export const CategoryBrowseResponseSchema = z.object({
  category: CategorySummarySchema,
  ancestors: z.array(CategorySummarySchema),
  children: z.array(CategorySummarySchema),
});
export type CategoryBrowseResponse = z.infer<typeof CategoryBrowseResponseSchema>;
