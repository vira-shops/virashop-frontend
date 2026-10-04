'use client';

import * as React from 'react';
import { Badge, Tabs } from '@/components/ui';
import { useMyQuestions } from '@/hooks';
import { toFaDigits } from '@/utils/format';
import { PAGE_TITLES } from '@/features/buyer-dashboard/constants';
import { REVIEW_TAB_LABELS } from './constants';
import type { ReviewTab, ReviewTabsProps } from './types';

/** «نظرات» / «پرسش ها» — the questions tab carries the question count. */
export const ReviewTabs: React.FC<ReviewTabsProps> = ({ value, onChange }) => {
  const questions = useMyQuestions();
  const questionCount = questions.data?.length ?? 0;

  const items = [
    { value: 'reviews', label: REVIEW_TAB_LABELS.reviews },
    {
      value: 'answers',
      label: (
        <span className="flex items-center gap-2">
          {REVIEW_TAB_LABELS.answers}
          <Badge color="gray" size="xs" radius="sm" className="px-2">
            {toFaDigits(questionCount)}
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
