import { z } from 'zod';

/* =========================================================
   Common response schemas reused across endpoints
   ========================================================= */

export const SuccessResponseSchema = z.object({
  success: z.boolean(),
});

export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;

export const EmptyResponseSchema = z.object({});
export type EmptyResponse = z.infer<typeof EmptyResponseSchema>;

export const MessageResponseSchema = z.object({
  message: z.string(),
});
export type MessageResponse = z.infer<typeof MessageResponseSchema>;
