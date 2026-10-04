import { z } from 'zod';
import { GeoPointSchema } from '@/contracts/endpoints/addresses/schemas';

export const GenderSchema = z.enum(['MALE', 'FEMALE']);
export type Gender = z.infer<typeof GenderSchema>;

/** «نوع خرید» — the kind of business the buyer runs. */
export const BuyTypeSchema = z.enum(['SHOP', 'SUPERMARKET', 'STORE']);
export type BuyType = z.infer<typeof BuyTypeSchema>;

export const PersonalInfoSchema = z.object({
  fullName: z.string(),
  mobile: z.string(),
  nationalId: z.string(),
  /** Gregorian `YYYY-MM-DD`. */
  birthDate: z.string().nullable(),
  gender: GenderSchema.nullable(),
  /** Retail «اطلاعات تکمیلی». */
  email: z.string().nullable().default(null),
  /** «شغل» — retail «اطلاعات تکمیلی». */
  occupation: z.string().nullable().default(null),
  avatarUrl: z.string().nullable(),
});
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

export const BusinessInfoSchema = z.object({
  name: z.string(),
  phone: z.string(),
  /** Province slug — `cities.getProvinces` values. */
  province: z.string(),
  /** City value — `cities.getList` values. */
  city: z.string(),
  postalCode: z.string(),
  buyType: BuyTypeSchema,
  address: z.string(),
  /** Uploaded national card / business license. */
  documentUrl: z.string().nullable(),
});
export type BusinessInfo = z.infer<typeof BusinessInfoSchema>;

/** «اطلاعات تکمیلی» — the retail buyer's home address, optionally pinned on the map. */
export const ProfileAddressSchema = z.object({
  line: z.string(),
  location: GeoPointSchema.nullable(),
});
export type ProfileAddress = z.infer<typeof ProfileAddressSchema>;

/** Wholesale buyers fill `business`; retail buyers fill `address`. */
export const ProfileSchema = z.object({
  personal: PersonalInfoSchema,
  business: BusinessInfoSchema.nullable(),
  address: ProfileAddressSchema.nullable(),
});
export type Profile = z.infer<typeof ProfileSchema>;

/**
 * `PUT /profile` body — avatar / document files go through their own upload
 * routes. Each dashboard sends only the second card it shows.
 */
export const ProfileUpdateRequestSchema = z.object({
  personal: PersonalInfoSchema.omit({ avatarUrl: true, mobile: true }),
  business: BusinessInfoSchema.omit({ documentUrl: true }).optional(),
  address: ProfileAddressSchema.optional(),
});
export type ProfileUpdateRequest = z.infer<typeof ProfileUpdateRequestSchema>;
