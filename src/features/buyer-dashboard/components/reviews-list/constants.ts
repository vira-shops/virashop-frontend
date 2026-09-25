import type { ReviewStatus } from '@/contracts/endpoints/reviews';
import type { ReviewTab } from './types';

export const REVIEW_TAB_LABELS: Record<ReviewTab, string> = {
  reviews: 'نظرات شما',
  answers: 'پاسخ ها',
};

export const DEFAULT_REVIEW_TAB: ReviewTab = 'reviews';

export const REVIEW_STATUS_LABELS: Record<ReviewStatus, string> = {
  PENDING: 'در انتظار',
  APPROVED: 'تایید شده',
  REJECTED: 'رد شده',
};

export const REVIEWS_EMPTY = { message: 'هنوز نظری ثبت', highlight: 'نکرده‌اید' } as const;
export const QUESTIONS_EMPTY = { message: 'هنوز پرسشی ثبت', highlight: 'نکرده‌اید' } as const;

export const SKELETON_COUNT = 2;
