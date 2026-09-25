import * as React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { toFaDigits } from '@/utils/format';
import { renderWithProviders } from '@/features/buyer-dashboard/test-utils';
import { NotificationsList } from '.';
// After the component: importing an endpoint module first would enter the
// contracts ↔ connections import cycle from the wrong end.
import { NOTIFICATIONS_MOCK } from '@/contracts/endpoints/notifications';

const unread = NOTIFICATIONS_MOCK.filter((item) => !item.read);

describe('NotificationsList', () => {
  it('splits unread and read notifications around the divider', async () => {
    renderWithProviders(<NotificationsList />);

    expect(await screen.findByRole('separator')).toHaveTextContent('خوانده شده');
    expect(screen.getAllByRole('article')).toHaveLength(NOTIFICATIONS_MOCK.length);
    // Title count chip = unread notifications.
    expect(screen.getByText(toFaDigits(unread.length))).toBeInTheDocument();
  });

  it('marks a notification read when it is opened, without moving it', async () => {
    renderWithProviders(<NotificationsList />);

    const first = await screen.findByRole('button', { name: unread[0].title });
    fireEvent.click(first);

    expect(first).toHaveAttribute('aria-expanded', 'true');
    await waitFor(() =>
      expect(screen.getByText(toFaDigits(unread.length - 1))).toBeInTheDocument(),
    );
    // Still the first card on the page.
    expect(screen.getAllByRole('article')[0]).toContainElement(first);
  });
});
