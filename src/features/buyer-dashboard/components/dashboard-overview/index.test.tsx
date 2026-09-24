import * as React from 'react';
import { screen, within } from '@testing-library/react';
import { PATHS } from '@/routes/paths';
import { toFaDigits } from '@/utils/format';
import { renderWithProviders } from '@/features/buyer-dashboard/test-utils';
import { DashboardOverview } from '.';
// After the component: importing an endpoint module first would enter the
// contracts ↔ connections import cycle from the wrong end.
import { ANNOUNCEMENTS_MOCK } from '@/contracts/endpoints/notifications';
import { ORDER_STATS_MOCK } from '@/contracts/endpoints/orders';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('DashboardOverview', () => {
  it('shows the announcements, the three KPI cards and the latest orders', async () => {
    renderWithProviders(<DashboardOverview />);

    expect(screen.getByRole('heading', { level: 1, name: 'داشبورد' })).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: ANNOUNCEMENTS_MOCK[0].title }),
    ).toBeInTheDocument();

    const delivered = await screen.findByRole('link', { name: /تحویل شده/ });
    expect(delivered).toHaveTextContent(toFaDigits(ORDER_STATS_MOCK.DELIVERED));
    expect(delivered).toHaveAttribute('href', `${PATHS.DASHBOARD.BUYER.ORDERS}?status=DELIVERED`);

    const table = await screen.findByRole('table', { name: 'سفارشات اخیر' });
    // Header row + three recent orders.
    expect(within(table).getAllByRole('row')).toHaveLength(4);
    expect(within(table).getAllByRole('link', { name: 'مشاهده جزئیات' })[0]).toHaveAttribute(
      'href',
      PATHS.DASHBOARD.BUYER.ORDER(1001),
    );
  });
});
