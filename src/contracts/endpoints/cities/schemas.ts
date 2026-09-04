import { z } from 'zod';

export const CitySchema = z.object({
  value: z.string(),
  label: z.string(),
});

export type City = z.infer<typeof CitySchema>;

export const CitiesListResponseSchema = z.array(CitySchema);
export type CitiesListResponse = z.infer<typeof CitiesListResponseSchema>;
