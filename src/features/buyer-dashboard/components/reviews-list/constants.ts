import type { FeedbackStatusTone } from '@/components/shared';
import type { ReviewStatus } from '@/contracts/endpoints/reviews';
import type { ReviewTab } from './types';

export const REVIEW_TAB_LABELS: Record<ReviewTab, string> = {
  reviews: 'نظرات',
  answers: 'پرسش ها',
};

export const DEFAULT_REVIEW_TAB: ReviewTab = 'reviews';

export const REVIEW_STATUS_LABELS: Record<ReviewStatus, string> = {
  PENDING: 'در انتظار',
  APPROVED: 'تایید شده',
  REJECTED: 'رد شده',
};

/** Question moderation state — label and color in the card's corner. */
export const QUESTION_STATUS: Record<ReviewStatus, { label: string; tone: FeedbackStatusTone }> = {
  PENDING: { label: 'در انتظار', tone: 'muted' },
  APPROVED: { label: 'تایید شد', tone: 'success' },
  REJECTED: { label: 'تایید نشد', tone: 'error' },
};

export const REVIEWS_EMPTY = { message: 'هنوز نظری ثبت', highlight: 'نکرده‌اید' } as const;
export const QUESTIONS_EMPTY = { message: 'هنوز پرسشی ثبت', highlight: 'نکرده‌اید' } as const;

export const SKELETON_COUNT = 2;
