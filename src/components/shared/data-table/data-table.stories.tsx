import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatusIcon } from '@/components/ui';
import { EmptyState } from '@/components/shared/empty-state';
import { DataTable } from './data-table';
import type { DataTableColumn } from './types';

interface OrderRow {
  id: number;
  code: string;
  amount: string;
  status: string;
  paid: boolean;
  date: string;
}

const ROWS: OrderRow[] = [
  {
    id: 1,
    code: '۱۲۳۴۵۶۷۸۹۱۵۴۲',
    amount: '۲٬۵۴۰٬۰۰۰',
    status: 'درحال پردازش',
    paid: true,
    date: '۱۴۰۰/۵/۲۱',
  },
  {
    id: 2,
    code: '۱۲۳۴۵۶۷۸۹۱۵۴۳',
    amount: '۲٬۵۴۰٬۰۰۰',
    status: 'لغو شده',
    paid: false,
    date: '۱۴۰۰/۵/۲۱',
  },
  {
    id: 3,
    code: '۱۲۳۴۵۶۷۸۹۱۵۴۴',
    amount: '۲٬۵۴۰٬۰۰۰',
    status: 'تحویل شده',
    paid: true,
    date: '۱۴۰۰/۵/۲۱',
  },
];

const COLUMNS: DataTableColumn<OrderRow>[] = [
  { key: 'code', header: 'کد پیگیری', render: (row) => row.code },
  { key: 'amount', header: 'مبلغ', align: 'center', render: (row) => `${row.amount} تومان` },
  { key: 'status', header: 'وضعیت سفارش', align: 'center', render: (row) => row.status },
  {
    key: 'paid',
    header: 'عملیات پرداخت',
    align: 'center',
    render: (row) => (
      <StatusIcon
        status={row.paid ? 'success' : 'error'}
        label={row.paid ? 'پرداخت شده' : 'پرداخت نشده'}
        className="mx-auto"
      />
    ),
  },
  { key: 'date', header: 'تاریخ', align: 'center', render: (row) => row.date },
];

const meta: Meta<typeof DataTable<OrderRow>> = {
  title: 'Shared/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  args: {
    'aria-label': 'سفارشات اخیر',
    columns: COLUMNS,
    rows: ROWS,
    getRowKey: (row: OrderRow) => row.id,
    getRowHref: () => '#',
  },
  decorators: [
    (Story) => (
      <div className="rounded-8 max-w-4xl border border-blue-100 bg-white p-7">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DataTable<OrderRow>>;

export const Striped: Story = {};

export const Divided: Story = { args: { variant: 'divided', getRowHref: undefined } };

export const Loading: Story = { args: { loading: true } };

export const Empty: Story = {
  args: {
    rows: [],
    emptyState: <EmptyState variant="inline" message="متاسفانه سفارشی وجود" highlight="ندارد" />,
  },
};
