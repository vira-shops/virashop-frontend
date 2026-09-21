import { z } from 'zod';
import { ChannelSchema, SlugSchema } from '@/validations';

/* =========================================================
   Products — enums
   ========================================================= */

export const ProductStockStatusSchema = z.enum(['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK']);
export type ProductStockStatus = z.infer<typeof ProductStockStatusSchema>;

export const ProductSortSchema = z.enum([
  'relevant',
  'newest',
  'bestselling',
  'cheapest',
  'expensive',
  'discounted',
]);
export type ProductSort = z.infer<typeof ProductSortSchema>;

/* =========================================================
   Products — card (list/search/related shape)
   ========================================================= */

export const ProductSellerSchema = z.object({
  id: z.number(),
  shopName: z.string(),
  logoKey: z.string().nullable(),
  /**
   * Short-lived URL when `logoKey` is under `uploads/`; otherwise map `logoKey`
   * to a static asset. Omitted entirely (not just `null`) when there is none.
   */
  logoUrl: z.string().nullable().optional(),
});
export type ProductSeller = z.infer<typeof ProductSellerSchema>;

export const ProductCardSchema = z.object({
  id: z.number(),
  slug: SlugSchema,
  name: z.string(),
  /** Asset slug OR storage key `uploads/...`. */
  imageKey: z.string().nullable(),
  /**
   * Short-lived URL when `imageKey` is under `uploads/`; otherwise map `imageKey`
   * to a static asset. Omitted entirely (not just `null`) when there is none.
   */
  imageUrl: z.string().nullable().optional(),
  /** Tomans — retail or wholesale unit price, depending on the requested `channel`. */
  price: z.number(),
  compareAtPrice: z.number().nullable(),
  discountPercent: z.number(),
  badges: z.array(z.string()).default([]),
  stockStatus: ProductStockStatusSchema,
  seller: ProductSellerSchema,
  /** Always `1` in this slice — multi-seller comparison is not available yet. */
  storeCount: z.number().int().nonnegative(),
  channel: ChannelSchema,
});
export type ProductCard = z.infer<typeof ProductCardSchema>;

/* =========================================================
   Products — list
   ========================================================= */

export const ProductListQuerySchema = z.object({
  channel: ChannelSchema.default('RETAIL'),
  page: z.coerce.number().int().min(1).default(1),
  /** Max 50. */
  limit: z.coerce.number().int().min(1).max(50).default(20),
  sort: ProductSortSchema.default('relevant'),
  categoryId: z.coerce.number().optional(),
  /** Unknown slug → empty page, not an error. */
  categorySlug: z.string().optional(),
  /** `true` drops OUT_OF_STOCK items (the listing's «کالای موجود» toggle). */
  inStock: z.coerce.boolean().optional(),
  /** Matches name / brand / slug. */
  q: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
});
export type ProductListQuery = z.infer<typeof ProductListQuerySchema>;

export const ProductListResponseSchema = z.object({
  items: z.array(ProductCardSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});
export type ProductListResponse = z.infer<typeof ProductListResponseSchema>;

/* =========================================================
   Products — detail
   ========================================================= */

export const ProductGalleryImageSchema = z.object({
  imageKey: z.string(),
  /** Short-lived URL when `imageKey` is under `uploads/`. Omitted entirely when there is none. */
  url: z.string().nullable().optional(),
  alt: z.string().nullable(),
  isPrimary: z.boolean(),
  sortOrder: z.number(),
});
export type ProductGalleryImage = z.infer<typeof ProductGalleryImageSchema>;

export const ProductSpecSchema = z.object({
  key: z.string(),
  label: z.string(),
  value: z.string(),
});
export type ProductSpec = z.infer<typeof ProductSpecSchema>;

export const WholesaleTierSchema = z.object({
  minQty: z.number(),
  maxQty: z.number().nullable(),
  unitPrice: z.number(),
});
export type WholesaleTier = z.infer<typeof WholesaleTierSchema>;

export const WholesaleInstallmentSchema = z.object({
  months: z.number(),
  monthlyFeePercent: z.number(),
});
export type WholesaleInstallment = z.infer<typeof WholesaleInstallmentSchema>;

export const WholesaleInfoSchema = z.object({
  moq: z.number(),
  maxQty: z.number().nullable(),
  packMultiple: z.number(),
  cashPrice: z.number().nullable(),
  packPrice: z.number().nullable(),
  installment: WholesaleInstallmentSchema.nullable(),
  tiers: z.array(WholesaleTierSchema),
});
export type WholesaleInfo = z.infer<typeof WholesaleInfoSchema>;

export const ProductCategoryRefSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
});
export type ProductCategoryRef = z.infer<typeof ProductCategoryRefSchema>;

export const ProductDetailSchema = ProductCardSchema.extend({
  shortDescription: z.string().nullable(),
  description: z.string().nullable(),
  brand: z.string().nullable(),
  sku: z.string().nullable(),
  gallery: z.array(ProductGalleryImageSchema),
  specs: z.array(ProductSpecSchema),
  productionDate: z.string().nullable(),
  expiryDate: z.string().nullable(),
  category: ProductCategoryRefSchema,
  /** Only populated when `channel=WHOLESALE`; retail always gets `null`. */
  wholesale: WholesaleInfoSchema.nullable(),
  /** Same category first; falls back to the parent category if fewer than 3. */
  related: z.array(ProductCardSchema),
});
export type ProductDetail = z.infer<typeof ProductDetailSchema>;

export const ProductDetailQuerySchema = z.object({
  channel: ChannelSchema.default('RETAIL'),
});
export type ProductDetailQuery = z.infer<typeof ProductDetailQuerySchema>;
