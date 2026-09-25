'use client';

import * as React from 'react';
import { Badge, Tabs } from '@/components/ui';
import { useMyQuestions } from '@/hooks';
import { toFaDigits } from '@/utils/format';
import { PAGE_TITLES } from '@/features/buyer-dashboard/constants';
import { REVIEW_TAB_LABELS } from './constants';
import type { ReviewTab, ReviewTabsProps } from './types';

/** «نظرات شما» / «پاسخ ها» — the answers tab counts questions that got an answer. */
export const ReviewTabs: React.FC<ReviewTabsProps> = ({ value, onChange }) => {
  const questions = useMyQuestions();
  const answeredCount = (questions.data ?? []).filter((q) => q.answers.length > 0).length;

  const items = [
    { value: 'reviews', label: REVIEW_TAB_LABELS.reviews },
    {
      value: 'answers',
      label: (
        <span className="flex items-center gap-2">
          {REVIEW_TAB_LABELS.answers}
          <Badge color="gray" size="xs" radius="sm" className="px-2">
            {toFaDigits(answeredCount)}
          </Badge>
        </span>
      ),
    },
  ];

  return (
    <div className="border-b border-blue-100">
      <Tabs
        aria-label={PAGE_TITLES.reviews}
        variant="underline"
        items={items}
        value={value}
        onChange={(next) => onChange(next as ReviewTab)}
        itemClassName="pb-4"
      />
    </div>
  );
};
