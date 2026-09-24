'use client';

import * as React from 'react';
import { Badge, Skeleton, Tabs } from '@/components/ui';
import { EmptyState, FeedbackCard, PageHeading } from '@/components/shared';
import type { ReviewProduct } from '@/contracts/endpoints/reviews';
import { useMyQuestions, useMyReviews } from '@/hooks';
import { PATHS } from '@/routes/paths';
import { toFaDigits } from '@/utils/format';
import {
  PAGE_TITLES,
  QUESTIONS_EMPTY,
  REVIEWS_EMPTY,
  REVIEW_STATUS_LABELS,
  REVIEW_TABS,
} from '@/features/buyer-dashboard/constants';

type ReviewTab = 'reviews' | 'answers';

const toFeedbackProduct = (product: ReviewProduct) => ({
  name: product.name,
  image: product.image,
  href:
    product.channel === 'WHOLESALE'
      ? PATHS.WHOLESALE.PRODUCT(product.slug)
      : PATHS.RETAIL.PRODUCT(product.slug),
});

const ListSkeleton: React.FC = () => (
  <div className="flex flex-col gap-5" aria-busy="true">
    {Array.from({ length: 2 }, (_, index) => (
      <Skeleton key={index} className="rounded-8 h-44 w-full" />
    ))}
  </div>
);

/** «نظرات و پرسش» — the buyer's reviews, and their questions with answers. */
export const ReviewsList: React.FC = () => {
  const [tab, setTab] = React.useState<ReviewTab>('reviews');
  const reviews = useMyReviews();
  const questions = useMyQuestions();

  const answeredCount = (questions.data ?? []).filter((q) => q.answers.length > 0).length;

  const tabs = [
    { value: 'reviews', label: REVIEW_TABS.reviews },
    {
      value: 'answers',
      label: (
        <span className="flex items-center gap-2">
          {REVIEW_TABS.answers}
          <Badge color="gray" size="xs" radius="sm" className="px-2">
            {toFaDigits(answeredCount)}
          </Badge>
        </span>
      ),
    },
  ];

  const renderReviews = () => {
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
        // Published reviews need no label — only moderation states are called out.
        statusLabel={review.status === 'APPROVED' ? undefined : REVIEW_STATUS_LABELS[review.status]}
      />
    ));
  };

  const renderQuestions = () => {
    if (questions.isLoading) return <ListSkeleton />;

    if (!questions.data?.length) {
      return (
        <EmptyState
          variant="inline"
          message={QUESTIONS_EMPTY.message}
          highlight={QUESTIONS_EMPTY.highlight}
        />
      );
    }

    return questions.data.map((question) => (
      <FeedbackCard
        key={question.id}
        variant="question"
        product={toFeedbackProduct(question.product)}
        date={question.createdAt}
        question={question.question}
        answers={question.answers}
      />
    ));
  };

  return (
    <>
      <PageHeading title={PAGE_TITLES.reviews} />

      <div className="border-b border-blue-100">
        <Tabs
          aria-label={PAGE_TITLES.reviews}
          variant="underline"
          items={tabs}
          value={tab}
          onChange={(value) => setTab(value as ReviewTab)}
          itemClassName="pb-4"
        />
      </div>

      <div className="flex flex-col gap-5">
        {tab === 'reviews' ? renderReviews() : renderQuestions()}
      </div>
    </>
  );
};
