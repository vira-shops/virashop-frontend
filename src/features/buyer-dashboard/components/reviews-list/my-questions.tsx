'use client';

import * as React from 'react';
import { EmptyState, FeedbackCard } from '@/components/shared';
import { useMyQuestions } from '@/hooks';
import { QUESTIONS_EMPTY } from './constants';
import { ListSkeleton } from './list-skeleton';
import { toFeedbackProduct } from './utils';

/** The buyer's questions with the answers they received. */
export const MyQuestions: React.FC = () => {
  const questions = useMyQuestions();

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
