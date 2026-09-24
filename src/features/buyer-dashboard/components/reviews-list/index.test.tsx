import * as React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@/features/buyer-dashboard/test-utils';
import { ReviewsList } from '.';
// After the component: importing an endpoint module first would enter the
// contracts ↔ connections import cycle from the wrong end.
import { MY_QUESTIONS_MOCK, MY_REVIEWS_MOCK } from '@/contracts/endpoints/reviews';

describe('ReviewsList', () => {
  it('shows the buyer reviews first, with moderation status', async () => {
    renderWithProviders(<ReviewsList />);

    expect(screen.getByRole('tab', { name: 'نظرات شما' })).toHaveAttribute('aria-selected', 'true');
    expect(await screen.findByText(MY_REVIEWS_MOCK[0].title)).toBeInTheDocument();
    expect(screen.getByText('در انتظار')).toBeInTheDocument();
  });

  it('switches to the answered questions tab', async () => {
    renderWithProviders(<ReviewsList />);

    fireEvent.click(await screen.findByRole('tab', { name: /پاسخ ها/ }));

    expect(await screen.findByText(MY_QUESTIONS_MOCK[0].question)).toBeInTheDocument();
    expect(screen.queryByText(MY_REVIEWS_MOCK[0].title)).toBeNull();
  });
});
