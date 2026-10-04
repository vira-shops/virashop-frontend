import { z } from 'zod';
import { GeoPointSchema, type Address } from '@/contracts/endpoints/addresses/schemas';
import type { SaveAddressInput } from '@/hooks/use-addresses';

/** One saved address as the dashboard form edits it (per the design's field set). */
export const AddressFormSchema = z.object({
  province: z.string().min(1, 'استان را انتخاب کنید'),
  city: z.string().min(1, 'شهر را انتخاب کنید'),
  postalCode: z.string().regex(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد'),
  plaque: z.string().trim(),
  unit: z.string().trim(),
  line: z.string().trim().min(10, 'آدرس را کامل وارد کنید'),
  location: GeoPointSchema.nullable(),
});
export type AddressFormValues = z.infer<typeof AddressFormSchema>;

export const EMPTY_ADDRESS_FORM: AddressFormValues = {
  province: '',
  city: '',
  postalCode: '',
  plaque: '',
  unit: '',
  line: '',
  location: null,
};

export const toAddressFormValues = (address: Address): AddressFormValues => ({
  province: address.province,
  city: address.city,
  postalCode: address.postalCode,
  plaque: address.plaque ?? '',
  unit: address.unit ?? '',
  line: address.line,
  location: address.location,
});

/**
 * `existing` keeps the id, label and default flag; the very first address
 * becomes the default.
 */
export const toSaveAddressInput = (
  values: AddressFormValues,
  existing: Address | null,
  isFirst: boolean,
): SaveAddressInput => ({
  ...(existing ? { id: existing.id } : {}),
  title: existing?.title ?? null,
  province: values.province,
  city: values.city,
  postalCode: values.postalCode,
  plaque: values.plaque || null,
  unit: values.unit || null,
  line: values.line.trim(),
  location: values.location,
  isDefault: existing?.isDefault ?? isFirst,
});
