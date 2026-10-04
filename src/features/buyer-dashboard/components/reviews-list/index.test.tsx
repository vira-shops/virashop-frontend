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

    expect(screen.getByRole('tab', { name: 'نظرات' })).toHaveAttribute('aria-selected', 'true');
    expect(await screen.findByText(MY_REVIEWS_MOCK[0].title)).toBeInTheDocument();
    expect(screen.getByText('در انتظار')).toBeInTheDocument();
  });

  it('switches to the questions tab, with each moderation status', async () => {
    renderWithProviders(<ReviewsList />);

    fireEvent.click(await screen.findByRole('tab', { name: /پرسش ها/ }));

    expect(await screen.findAllByText(MY_QUESTIONS_MOCK[0].question)).toHaveLength(
      MY_QUESTIONS_MOCK.length,
    );
    expect(screen.getByText('تایید شد')).toHaveClass('text-warning-green');
    expect(screen.getByText('تایید نشد')).toHaveClass('text-warning-red');
    expect(screen.queryByText(MY_REVIEWS_MOCK[0].title)).toBeNull();
  });
});
