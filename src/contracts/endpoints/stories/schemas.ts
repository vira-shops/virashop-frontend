import { z } from 'zod';

/** A story as it appears on the wire — strings only, transformed client-side. */
export const StoryWireSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  duration: z.number().int().positive().optional(),
});

export type StoryWire = z.infer<typeof StoryWireSchema>;

export const StoriesListResponseSchema = z.array(StoryWireSchema);
export type StoriesListResponse = z.infer<typeof StoriesListResponseSchema>;
