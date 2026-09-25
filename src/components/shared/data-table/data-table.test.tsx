import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DataTable } from './data-table';
import type { DataTableColumn } from './types';

const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

interface Row {
  id: number;
  code: string;
  amount: string;
}

const rows: Row[] = [
  { id: 1, code: '۱۲۳۴', amount: '۲۵۰۰' },
  { id: 2, code: '۵۶۷۸', amount: '۳۰۰۰' },
];

const columns: DataTableColumn<Row>[] = [
  { key: 'code', header: 'کد پیگیری', render: (row) => row.code },
  {
    key: 'amount',
    header: 'مبلغ',
    render: (row) => row.amount,
    align: 'center',
    cellClassName: 'max-md:hidden',
    headerClassName: 'max-md:hidden',
  },
];

describe('DataTable', () => {
  beforeEach(() => push.mockClear());

  it('renders headers and one row per item', () => {
    render(
      <DataTable aria-label="سفارشات" columns={columns} rows={rows} getRowKey={(r) => r.id} />,
    );

    expect(screen.getByRole('table', { name: 'سفارشات' })).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getByRole('cell', { name: '۲۵۰۰' })).toHaveClass('max-md:hidden');
    expect(screen.getByRole('columnheader', { name: 'مبلغ' })).toHaveClass('max-md:hidden');
  });

  it('adds a chevron link per row and navigates on row click', () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
        getRowKey={(r) => r.id}
        getRowHref={(r) => `/orders/${r.id}`}
      />,
    );

    const links = screen.getAllByRole('link', { name: 'مشاهده جزئیات' });

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/orders/1');

    fireEvent.click(screen.getByRole('cell', { name: '۵۶۷۸' }));
    expect(push).toHaveBeenCalledWith('/orders/2');

    push.mockClear();
    fireEvent.click(links[0]);
    expect(push).not.toHaveBeenCalled();
  });

  it('renders the empty state instead of the table', () => {
    render(
      <DataTable
        columns={columns}
        rows={[]}
        getRowKey={(r) => r.id}
        emptyState={<p>سفارشی وجود ندارد</p>}
      />,
    );

    expect(screen.queryByRole('table')).toBeNull();
    expect(screen.getByText('سفارشی وجود ندارد')).toBeInTheDocument();
  });

  it('renders skeleton rows while loading, even with an empty state', () => {
    render(
      <DataTable
        columns={columns}
        rows={[]}
        getRowKey={(r) => r.id}
        loading
        skeletonRows={4}
        hideHeader
        emptyState={<p>خالی</p>}
      />,
    );

    expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getAllByRole('row')).toHaveLength(4);
    expect(screen.queryByRole('columnheader')).toBeNull();
    expect(screen.queryByText('خالی')).toBeNull();
  });
});
