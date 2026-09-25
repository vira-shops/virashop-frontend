'use client';

import * as React from 'react';
import { PageHeading } from '@/components/shared';
import { PAGE_TITLES } from '@/features/buyer-dashboard/constants';
import { DEFAULT_REVIEW_TAB } from './constants';
import { MyQuestions } from './my-questions';
import { MyReviews } from './my-reviews';
import { ReviewTabs } from './review-tabs';
import type { ReviewTab } from './types';

/** «نظرات و پرسش» — the buyer's reviews, and their questions with answers. */
export const ReviewsList: React.FC = () => {
  const [tab, setTab] = React.useState<ReviewTab>(DEFAULT_REVIEW_TAB);

  return (
    <>
      <PageHeading title={PAGE_TITLES.reviews} />
      <ReviewTabs value={tab} onChange={setTab} />
      <div className="flex flex-col gap-5">
        {tab === 'reviews' ? <MyReviews /> : <MyQuestions />}
      </div>
    </>
  );
};
