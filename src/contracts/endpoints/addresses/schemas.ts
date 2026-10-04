import { z } from 'zod';
import { IDSchema } from '@/validations';

/** A pin dropped on the «انتخاب روی نقشه» map. */
export const GeoPointSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});
export type GeoPoint = z.infer<typeof GeoPointSchema>;

/**
 * One saved address. The dashboard identifies it by «استان - شهر» + street
 * line; `title` is an optional label (e.g. «انبار») the checkout shows when
 * present.
 */
export const AddressSchema = z.object({
  id: z.number(),
  title: z.string().nullable().default(null),
  /** Province slug — `cities.getProvinces` values. */
  province: z.string(),
  /** City value — `cities.getList` values. */
  city: z.string(),
  /** Full street line. */
  line: z.string(),
  postalCode: z.string(),
  /** «پلاک» */
  plaque: z.string().nullable().default(null),
  /** «واحد» */
  unit: z.string().nullable().default(null),
  location: GeoPointSchema.nullable().default(null),
  /** The radio-selected address — used for delivery by default. */
  isDefault: z.boolean(),
});
export type Address = z.infer<typeof AddressSchema>;

export const AddressesResponseSchema = z.array(AddressSchema);
export type AddressesResponse = z.infer<typeof AddressesResponseSchema>;

/** `POST /addresses` body — the server assigns the id. */
export const AddressInputSchema = AddressSchema.omit({ id: true });
export type AddressInput = z.infer<typeof AddressInputSchema>;

/** `PUT /addresses/{id}` body. */
export const AddressUpdateRequestSchema = AddressInputSchema.extend({ id: IDSchema });
export type AddressUpdateRequest = z.infer<typeof AddressUpdateRequestSchema>;
