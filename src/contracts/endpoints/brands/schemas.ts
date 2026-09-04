import { z } from 'zod';
import { IDSchema } from '@/validations/primitives';

export const PartnerBrandSchema = z.object({
  id: IDSchema,
  name: z.string(),
  logo: z.string(),
  logoAlt: z.string().optional(),
});

export type PartnerBrand = z.infer<typeof PartnerBrandSchema>;

export const PartnerBrandsResponseSchema = z.array(PartnerBrandSchema);

export type PartnerBrandsResponse = z.infer<typeof PartnerBrandsResponseSchema>;
