import * as React from 'react';
import { fireEvent, screen, within } from '@testing-library/react';
import { toFaDigits } from '@/utils/format';
import { renderWithProviders } from '@/features/buyer-dashboard/test-utils';
import { OrdersList } from '.';

const mockReplace = jest.fn();
let mockSearch = '';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: mockReplace }),
  usePathname: () => '/dashboard/wholesale-buyer/orders',
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
    renderWithProviders(<OrdersList channel="WHOLESALE" />);

    expect(screen.getByRole('tab', { name: /جاری/ })).toHaveAttribute('aria-selected', 'true');
    const table = await screen.findByRole('table', { name: 'سفارش ها' });
    await within(table).findByText(toFaDigits('1234567891542'));

    expect(rowCodes(table)).toEqual(
      ['1234567891542', '1234567891545', '1234567891548'].map(toFaDigits),
    );
  });

  it('reads the status tab from the URL and writes tab changes back', async () => {
    mockSearch = 'status=DELIVERED';
    renderWithProviders(<OrdersList channel="WHOLESALE" />);

    expect(screen.getByRole('tab', { name: /تحویل شده/ })).toHaveAttribute('aria-selected', 'true');
    const table = screen.getByRole('table');
    await within(table).findByText(toFaDigits('1234567891544'));
    expect(rowCodes(table)).toHaveLength(2);

    fireEvent.click(screen.getByRole('tab', { name: /لغو شده/ }));
    expect(mockReplace).toHaveBeenCalledWith('/dashboard/wholesale-buyer/orders?status=CANCELLED', {
      scroll: false,
    });
  });

  it('shows the empty state when nothing matches', async () => {
    mockSearch = 'status=PROCESSING&q=0000';
    renderWithProviders(<OrdersList channel="WHOLESALE" />);

    // Desktop table + phone cards each show it (one of them is CSS-hidden).
    const empty = await screen.findAllByRole('status');
    expect(empty).toHaveLength(2);
    empty.forEach((node) => expect(node).toHaveTextContent('متاسفانه سفارشی وجود ندارد'));
  });

  it('shows and clears the active date range', async () => {
    mockSearch = 'from=2021-08-01&to=2021-08-12';
    renderWithProviders(<OrdersList channel="WHOLESALE" />);

    expect(screen.getByText(/از ۱۴۰۰\/۰۵\/۱۰ تا ۱۴۰۰\/۰۵\/۲۱/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'حذف فیلتر تاریخ' }));

    expect(mockReplace).toHaveBeenCalledWith('/dashboard/wholesale-buyer/orders', {
      scroll: false,
    });
  });

  it('opens the date-range modal and the tracking-code search', () => {
    renderWithProviders(<OrdersList channel="WHOLESALE" />);

    // Phone search field + desktop toolbar both open the same modal.
    const dateButtons = screen.getAllByRole('button', { name: 'جستجو بر اساس تاریخ' });
    expect(dateButtons).toHaveLength(2);
    fireEvent.click(dateButtons[1]);
    expect(screen.getByRole('dialog', { name: 'جستجو تاریخ' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'بستن' }));
    // Phones keep one search field open; desktop reveals a second from the toolbar.
    expect(screen.getAllByRole('textbox', { name: 'جستجوی کد پیگیری' })).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'جستجوی کد پیگیری' }));
    const search = screen.getAllByRole('textbox', { name: 'جستجوی کد پیگیری' })[1];

    fireEvent.change(search, { target: { value: '1545' } });
    fireEvent.submit(search);
    expect(mockReplace).toHaveBeenCalledWith('/dashboard/wholesale-buyer/orders?q=1545', {
      scroll: false,
    });
  });

  it('renders one card per order for phones, linking to its details', async () => {
    renderWithProviders(<OrdersList channel="RETAIL" />);

    const cards = await screen.findByRole('list', { name: 'سفارش ها' });
    await within(cards).findByText(toFaDigits('1234567891542'));

    const links = within(cards).getAllByRole('link', { name: 'مشاهده جزئیات' });
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute(
      'href',
      expect.stringMatching(/^\/dashboard\/retail-buyer\/orders\/\d+$/),
    );
  });
});
