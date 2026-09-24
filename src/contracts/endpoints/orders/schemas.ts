import { z } from 'zod';

/* =========================================================
   Orders — enums (single source of truth for the wire)
   ========================================================= */

/** `PROCESSING` is the «جاری» / «درحال پردازش» bucket. */
export const OrderStatusSchema = z.enum(['PROCESSING', 'DELIVERED', 'RETURNED', 'CANCELLED']);
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

export const PaymentStatusSchema = z.enum(['PAID', 'FAILED', 'PENDING']);
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

/* =========================================================
   Orders — entities
   ========================================================= */

export const OrderThumbnailSchema = z.object({
  name: z.string(),
  image: z.string(),
});
export type OrderThumbnail = z.infer<typeof OrderThumbnailSchema>;

/** One row of the orders list / the dashboard's recent orders. */
export const OrderSummarySchema = z.object({
  id: z.number(),
  trackingCode: z.string(),
  /** Tomans, after discount. */
  total: z.number(),
  status: OrderStatusSchema,
  paymentStatus: PaymentStatusSchema,
  /** ISO timestamp. */
  createdAt: z.string(),
  /** Product thumbnails for the list's image strip. */
  items: z.array(OrderThumbnailSchema),
});
export type OrderSummary = z.infer<typeof OrderSummarySchema>;

export const OrderLineSchema = z.object({
  id: z.number(),
  productSlug: z.string(),
  name: z.string(),
  image: z.string(),
  /** Tomans per unit. */
  unitPrice: z.number(),
  quantity: z.number(),
  /** Tomans for the line. */
  total: z.number(),
});
export type OrderLine = z.infer<typeof OrderLineSchema>;

export const OrderSenderSchema = z.object({
  fullName: z.string(),
  mobile: z.string(),
  nationalId: z.string(),
  postalCode: z.string(),
  plate: z.string(),
  address: z.string(),
});
export type OrderSender = z.infer<typeof OrderSenderSchema>;

export const OrderDetailSchema = OrderSummarySchema.omit({ items: true }).extend({
  /** Human label from the backend — «آنلاین», «در محل», … */
  paymentMethod: z.string(),
  /** «پیشتاز», «پست معمولی», … */
  shippingMethod: z.string(),
  /** Tomans; `0` renders as «رایگان». */
  shippingCost: z.number(),
  /** Tomans before discount. */
  subtotal: z.number(),
  sender: OrderSenderSchema,
  items: z.array(OrderLineSchema),
  /** Invoice PDF, when issued. */
  invoiceUrl: z.string().nullable(),
});
export type OrderDetail = z.infer<typeof OrderDetailSchema>;

/** Order counts per status — the stat cards and the list tabs. */
export const OrderStatsSchema = z.record(OrderStatusSchema, z.number());
export type OrderStats = z.infer<typeof OrderStatsSchema>;

/* =========================================================
   Orders — requests / responses
   ========================================================= */

/** `GET /orders` query — every filter is optional. */
export const OrdersListQuerySchema = z.object({
  status: OrderStatusSchema.optional(),
  /** Gregorian `YYYY-MM-DD`, inclusive. */
  from: z.string().optional(),
  /** Gregorian `YYYY-MM-DD`, inclusive. */
  to: z.string().optional(),
  /** Matches the tracking code. */
  q: z.string().optional(),
  /** Latest N — the dashboard's recent orders. */
  limit: z.number().optional(),
});
export type OrdersListQuery = z.infer<typeof OrdersListQuerySchema>;

export const OrdersListResponseSchema = z.array(OrderSummarySchema);
export type OrdersListResponse = z.infer<typeof OrdersListResponseSchema>;
