import { z } from 'zod';

/* =========================================================
   Checkout — delivery addresses (owned by the `addresses` endpoint)
   ========================================================= */

export {
  AddressSchema,
  AddressesResponseSchema,
  type Address,
  type AddressesResponse,
} from '@/contracts/endpoints/addresses/schemas';

/* =========================================================
   Checkout — shipping
   ========================================================= */

export const ShippingMethodSchema = z.object({
  id: z.string(),
  label: z.string(),
  /** Tomans; `0` renders as «رایگان». */
  price: z.number(),
});
export type ShippingMethod = z.infer<typeof ShippingMethodSchema>;

/** A window inside a delivery day, e.g. «ساعت ۸-۱۲». */
export const DeliveryTimeSlotSchema = z.object({
  id: z.string(),
  label: z.string(),
});
export type DeliveryTimeSlot = z.infer<typeof DeliveryTimeSlotSchema>;

/** One selectable day in the «تاریخ تحویل» strip. */
export const DeliveryDaySchema = z.object({
  id: z.string(),
  /** Persian weekday, e.g. «سه شنبه». */
  weekday: z.string(),
  /** Jalali day of month, already in Persian digits. */
  day: z.string(),
  /** Weekend/holiday — the delivery strip paints these red. */
  isHoliday: z.boolean().default(false),
  times: z.array(DeliveryTimeSlotSchema),
});
export type DeliveryDay = z.infer<typeof DeliveryDaySchema>;

export const DeliveryOptionsResponseSchema = z.object({
  methods: z.array(ShippingMethodSchema),
  days: z.array(DeliveryDaySchema),
});
export type DeliveryOptionsResponse = z.infer<typeof DeliveryOptionsResponseSchema>;

/* =========================================================
   Checkout — payment
   ========================================================= */

export const PaymentMethodSchema = z.object({
  id: z.string(),
  label: z.string(),
});
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

export const PaymentMethodsResponseSchema = z.array(PaymentMethodSchema);
export type PaymentMethodsResponse = z.infer<typeof PaymentMethodsResponseSchema>;
