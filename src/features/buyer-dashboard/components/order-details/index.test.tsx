import * as React from 'react';
import { screen, within } from '@testing-library/react';
import { PATHS } from '@/routes/paths';
import { toFaDigits } from '@/utils/format';
import { renderWithProviders } from '@/features/buyer-dashboard/test-utils';
import { OrderDetails } from '.';
// After the component: importing an endpoint module first would enter the
// contracts ↔ connections import cycle from the wrong end.
import { ORDER_DETAIL_MOCK } from '@/contracts/endpoints/orders';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('OrderDetails', () => {
  it('renders the order, sender and products sections', async () => {
    renderWithProviders(<OrderDetails orderId="1001" />);

    const order = await screen.findByRole('region', { name: 'اطلاعات سفارش' });
    expect(within(order).getByText(toFaDigits(ORDER_DETAIL_MOCK.trackingCode))).toBeInTheDocument();
    expect(within(order).getByText('رایگان')).toBeInTheDocument();
    expect(within(order).getByRole('img', { name: 'پرداخت ناموفق' })).toBeInTheDocument();

    const sender = screen.getByRole('region', { name: 'اطلاعات فرستنده' });
    expect(within(sender).getByText(ORDER_DETAIL_MOCK.sender.address)).toBeInTheDocument();

    const products = screen.getByRole('region', { name: 'محصولات' });
    expect(within(products).getAllByText(ORDER_DETAIL_MOCK.items[0].name).length).toBeGreaterThan(
      0,
    );
  });

  it('links back to the orders list and to the invoice', async () => {
    renderWithProviders(<OrderDetails orderId="1001" />);

    expect(screen.getByRole('link', { name: 'بازگشت' })).toHaveAttribute(
      'href',
      PATHS.DASHBOARD.BUYER.ORDERS,
    );
    expect(await screen.findByRole('link', { name: 'مشاهده فاکتور' })).toBeInTheDocument();
  });
});
