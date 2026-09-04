import { z } from 'zod';
import { IDSchema } from '@/validations';

/* =========================================================
   Common request schemas reused across endpoints
   ========================================================= */

export const IdRequestSchema = z.object({
  id: IDSchema,
});

export type IdRequest = z.infer<typeof IdRequestSchema>;

export const EmptyRequestSchema = z.object({});
export type EmptyRequest = z.infer<typeof EmptyRequestSchema>;
