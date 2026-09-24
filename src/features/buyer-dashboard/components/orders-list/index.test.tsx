import * as React from 'react';
import { fireEvent, screen, within } from '@testing-library/react';
import { toFaDigits } from '@/utils/format';
import { renderWithProviders } from '@/features/buyer-dashboard/test-utils';
import { OrdersList } from '.';

const mockReplace = jest.fn();
let mockSearch = '';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: mockReplace }),
  usePathname: () => '/dashboard/buyer/orders',
  useSearchParams: () => new URLSearchParams(mockSearch),
}));

const rowCodes = (table: HTMLElement) =>
  within(table)
    .getAllByRole('row')
    .slice(1)
    .map((row) => within(row).getAllByRole('cell')[0].textContent);

describe('OrdersList', () => {
  beforeEach(() => {
    mockReplace.mockClear();
    mockSearch = '';
  });

  it('defaults to the current («جاری») orders', async () => {
    renderWithProviders(<OrdersList />);

    expect(screen.getByRole('tab', { name: /جاری/ })).toHaveAttribute('aria-selected', 'true');
    await screen.findByText(toFaDigits('1234567891542'));
    const table = screen.getByRole('table', { name: 'سفارش ها' });

    expect(rowCodes(table)).toEqual(
      ['1234567891542', '1234567891545', '1234567891548'].map(toFaDigits),
    );
  });

  it('reads the status tab from the URL and writes tab changes back', async () => {
    mockSearch = 'status=DELIVERED';
    renderWithProviders(<OrdersList />);

    expect(screen.getByRole('tab', { name: /تحویل شده/ })).toHaveAttribute('aria-selected', 'true');
    await screen.findByText(toFaDigits('1234567891544'));
    expect(rowCodes(screen.getByRole('table'))).toHaveLength(2);

    fireEvent.click(screen.getByRole('tab', { name: /لغو شده/ }));
    expect(mockReplace).toHaveBeenCalledWith('/dashboard/buyer/orders?status=CANCELLED', {
      scroll: false,
    });
  });

  it('shows the empty state when nothing matches', async () => {
    mockSearch = 'status=PROCESSING&q=0000';
    renderWithProviders(<OrdersList />);

    expect(await screen.findByRole('status')).toHaveTextContent('متاسفانه سفارشی وجود ندارد');
  });

  it('shows and clears the active date range', async () => {
    mockSearch = 'from=2021-08-01&to=2021-08-12';
    renderWithProviders(<OrdersList />);

    expect(screen.getByText(/از ۱۴۰۰\/۰۵\/۱۰ تا ۱۴۰۰\/۰۵\/۲۱/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'حذف فیلتر تاریخ' }));

    expect(mockReplace).toHaveBeenCalledWith('/dashboard/buyer/orders', { scroll: false });
  });

  it('opens the date-range modal and the tracking-code search', () => {
    renderWithProviders(<OrdersList />);

    fireEvent.click(screen.getByRole('button', { name: 'جستجو بر اساس تاریخ' }));
    expect(screen.getByRole('dialog', { name: 'جستجو تاریخ' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'بستن' }));
    fireEvent.click(screen.getByRole('button', { name: 'جستجوی کد پیگیری' }));
    const search = screen.getByRole('textbox', { name: 'جستجوی کد پیگیری' });

    fireEvent.change(search, { target: { value: '1545' } });
    fireEvent.submit(search);
    expect(mockReplace).toHaveBeenCalledWith('/dashboard/buyer/orders?q=1545', { scroll: false });
  });
});
