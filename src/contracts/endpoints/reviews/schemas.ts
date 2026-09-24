import { z } from 'zod';
import { ChannelSchema } from '@/validations';

export const ReviewStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED']);
export type ReviewStatus = z.infer<typeof ReviewStatusSchema>;

export const ReviewProductSchema = z.object({
  slug: z.string(),
  channel: ChannelSchema,
  name: z.string(),
  image: z.string(),
});
export type ReviewProduct = z.infer<typeof ReviewProductSchema>;

/** A review the buyer wrote. */
export const MyReviewSchema = z.object({
  id: z.number(),
  product: ReviewProductSchema,
  rating: z.number().min(0).max(5),
  title: z.string(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  status: ReviewStatusSchema,
  /** ISO timestamp. */
  createdAt: z.string(),
});
export type MyReview = z.infer<typeof MyReviewSchema>;

/** A question the buyer asked, with the answers it received. */
export const MyQuestionSchema = z.object({
  id: z.number(),
  product: ReviewProductSchema,
  question: z.string(),
  answers: z.array(z.string()),
  /** ISO timestamp. */
  createdAt: z.string(),
});
export type MyQuestion = z.infer<typeof MyQuestionSchema>;

export const MyReviewsResponseSchema = z.array(MyReviewSchema);
export type MyReviewsResponse = z.infer<typeof MyReviewsResponseSchema>;

export const MyQuestionsResponseSchema = z.array(MyQuestionSchema);
export type MyQuestionsResponse = z.infer<typeof MyQuestionsResponseSchema>;
