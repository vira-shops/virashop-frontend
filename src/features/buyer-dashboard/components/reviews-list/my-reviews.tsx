'use client';

import * as React from 'react';
import { EmptyState, FeedbackCard } from '@/components/shared';
import { useMyReviews } from '@/hooks';
import { REVIEWS_EMPTY, REVIEW_STATUS_LABELS } from './constants';
import { ListSkeleton } from './list-skeleton';
import { toFeedbackProduct } from './utils';

/** The buyer's reviews; only moderation states get a status label. */
export const MyReviews: React.FC = () => {
  const reviews = useMyReviews();

  if (reviews.isLoading) return <ListSkeleton />;

  if (!reviews.data?.length) {
    return (
      <EmptyState
        variant="inline"
        message={REVIEWS_EMPTY.message}
        highlight={REVIEWS_EMPTY.highlight}
      />
    );
  }

  return reviews.data.map((review) => (
    <FeedbackCard
      key={review.id}
      variant="review"
      product={toFeedbackProduct(review.product)}
      date={review.createdAt}
      rating={review.rating}
      title={review.title}
      pros={review.pros}
      cons={review.cons}
      statusLabel={review.status === 'APPROVED' ? undefined : REVIEW_STATUS_LABELS[review.status]}
    />
  ));
};
