import { z } from 'zod';
import { ChannelSchema, SlugSchema } from '@/validations';

/* =========================================================
   Products — enums
   ========================================================= */

export const ProductStockStatusSchema = z.enum(['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK']);
export type ProductStockStatus = z.infer<typeof ProductStockStatusSchema>;

/** Sort values `GET /products` accepts on the wire — it 400s on anything else. */
export const ProductWireSortSchema = z.enum(['relevant', 'newest', 'cheapest']);
export type ProductWireSort = z.infer<typeof ProductWireSortSchema>;

/**
 * The listing's full sort vocabulary. `bestselling` / `expensive` /
 * `discounted` have no server-side equivalent yet, so `useProducts` resolves
 * them client-side — see `WIRE_SORT` there.
 */
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
  /**
   * Unknown slug → empty page, not an error. Exactly one slug: the endpoint
   * has no multi-category facet, so the listing's multi-select filter fans out
   * into one request per slug and merges them (see `useProductsByCategories`).
   */
  categorySlug: z.string().optional(),
  /**
   * `true` drops OUT_OF_STOCK items (the listing's «کالای موجود» toggle).
   * CLIENT-SIDE ONLY — the endpoint rejects an `inStock` param, so the hook
   * strips it from the request and applies it to the response instead.
   */
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

/* =========================================================
   Products — seller offers («فروشنده ها»)
   ========================================================= */

/** Ordering of the seller list: cheapest / closest / best overall value. */
export const SellerOfferSortSchema = z.enum(['cheapest', 'nearest', 'best']);
export type SellerOfferSort = z.infer<typeof SellerOfferSortSchema>;

/** One storefront's offer for a product — a row in the PDP's seller list. */
export const SellerOfferSchema = z.object({
  id: z.number(),
  seller: ProductSellerSchema,
  /** «ویژه» — a promoted storefront, flagged next to its name. */
  isFeatured: z.boolean(),
  /** Tomans, for this seller's own offer. */
  price: z.number(),
  discountPercent: z.number(),
  /** Months this seller offers on installments; `null` when it offers none. */
  installmentMonths: z.number().nullable(),
  /** Marketplace commission, shown as «کارمزد ٪»; `null` when there is none. */
  commissionPercent: z.number().nullable(),
  /** City the seller ships from, e.g. «یزد». */
  city: z.string(),
  /** Whole years on the marketplace, shown as «N سال عضویت». */
  membershipYears: z.number(),
  /** «نوع ارسال», e.g. «باربری». */
  shippingType: z.string(),
  /** «موجودی» — free text, e.g. «۵تن (فروش عمده و خرده)». */
  stockLabel: z.string(),
  /** ISO date of the seller's last price/stock change («آخرین تغییرات»). */
  updatedAt: z.string(),
});
export type SellerOffer = z.infer<typeof SellerOfferSchema>;

export const SellerOffersQuerySchema = z.object({
  channel: ChannelSchema.default('RETAIL'),
  sort: SellerOfferSortSchema.default('cheapest'),
});
export type SellerOffersQuery = z.infer<typeof SellerOffersQuerySchema>;

export const SellerOffersResponseSchema = z.object({
  items: z.array(SellerOfferSchema),
  /** Every seller carrying the product, including those beyond `items`. */
  total: z.number(),
});
export type SellerOffersResponse = z.infer<typeof SellerOffersResponseSchema>;

/* =========================================================
   Products — one seller's offer in detail (the selected-seller view)
   ========================================================= */

/** A label/value row in one of the offer's pricing tables. */
export const OfferTableRowSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  /** Struck through — used for the «قیمت مصرف کننده» reference price. */
  isStruck: z.boolean().default(false),
});
export type OfferTableRow = z.infer<typeof OfferTableRowSchema>;

/** One payment term in the calculator's grid, e.g. «نقدی» or «سه ماهه». */
export const OfferPaymentTermSchema = z.object({
  id: z.string(),
  label: z.string(),
  /** Tomans for the currently selected quantity. */
  price: z.number(),
});
export type OfferPaymentTerm = z.infer<typeof OfferPaymentTermSchema>;

/** A slider axis in the calculator («مدت»، «تعداد شل»، «تعداد»). */
export const OfferCalculatorAxisSchema = z.object({
  id: z.string(),
  /** Unit rendered after the number, e.g. «روز» / «شل» / «عدد». */
  unit: z.string(),
  min: z.number(),
  max: z.number(),
  defaultValue: z.number(),
  /** Accessible name — the design shows only the value bubble. */
  ariaLabel: z.string(),
});
export type OfferCalculatorAxis = z.infer<typeof OfferCalculatorAxisSchema>;

/**
 * One price row of the term grid. Wholesale prices a term once, so it sends
 * no rows and the grid falls back to each term's own `price`. Retail quotes
 * the same terms twice — «خرده» and «عمده» — and sends one row per book.
 */
export const OfferCalculatorRowSchema = z.object({
  id: z.string(),
  /** Row caption on the end side, e.g. «خرده». */
  label: z.string(),
  /** One price per term, in `terms` order. */
  prices: z.array(z.number()),
});
export type OfferCalculatorRow = z.infer<typeof OfferCalculatorRowSchema>;

export const OfferCalculatorSchema = z.object({
  /** Card heading, e.g. «نوع چک». Absent when the card opens on its note. */
  title: z.string().optional(),
  /** The dashed callout above the term grid; empty string hides it. */
  note: z.string(),
  terms: z.array(OfferPaymentTermSchema),
  /** Term selected when the view opens. */
  defaultTermId: z.string(),
  /** Empty → one flat grid of `terms`; otherwise one grid row per entry. */
  rows: z.array(OfferCalculatorRowSchema).default([]),
  /** The «− N شل +» controls; retail ships two, wholesale one. */
  quantities: z.array(OfferCalculatorAxisSchema),
  sliders: z.array(OfferCalculatorAxisSchema),
});
export type OfferCalculator = z.infer<typeof OfferCalculatorSchema>;

export const SellerOfferDetailSchema = SellerOfferSchema.extend({
  /** «تعرفه‌ها» — consumer price down to the bulk-discounted one. */
  tariffs: z.array(OfferTableRowSchema),
  /** «قیمت / اقساط». */
  installmentRows: z.array(OfferTableRowSchema),
  /** «طرح فروش شیرینگ» — volume brackets. */
  shrinkTiers: z.array(OfferTableRowSchema),
  /** Caption printed next to the shrink heading, e.g. «قیمت هر شل». */
  shrinkNote: z.string(),
  /** «مشخصات محصول / شرایط پرداخت». */
  attributes: z.array(OfferTableRowSchema),
  /** Swatches for the «N رنگ» attribute row; empty when the product has none. */
  colors: z.array(z.string()),
  /** «ماشین حساب ویرا». */
  calculator: OfferCalculatorSchema,
});
export type SellerOfferDetail = z.infer<typeof SellerOfferDetailSchema>;

export const SellerOfferDetailQuerySchema = z.object({
  channel: ChannelSchema.default('RETAIL'),
});
export type SellerOfferDetailQuery = z.infer<typeof SellerOfferDetailQuerySchema>;
