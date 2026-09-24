import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from './table';

const ROWS = [
  { code: '۱۲۳۴۵۶۷۸۹۱۵۴۲', amount: '۲٬۵۴۰٬۰۰۰ تومان', status: 'درحال پردازش', date: '۱۴۰۰/۵/۲۱' },
  { code: '۱۲۳۴۵۶۷۸۹۱۵۴۳', amount: '۱٬۲۰۰٬۰۰۰ تومان', status: 'لغو شده', date: '۱۴۰۰/۵/۲۰' },
  { code: '۱۲۳۴۵۶۷۸۹۱۵۴۴', amount: '۸۴۰٬۰۰۰ تومان', status: 'تحویل شده', date: '۱۴۰۰/۵/۱۸' },
];

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['striped', 'divided'] },
  },
  args: { variant: 'striped' },
  render: (args) => (
    <div className="rounded-8 max-w-3xl bg-white p-7">
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableHeaderCell>کد پیگیری</TableHeaderCell>
            <TableHeaderCell align="center">مبلغ</TableHeaderCell>
            <TableHeaderCell align="center">وضعیت سفارش</TableHeaderCell>
            <TableHeaderCell align="end">تاریخ</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ROWS.map((row) => (
            <TableRow key={row.code}>
              <TableCell>{row.code}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="end">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Striped: Story = {};

export const Divided: Story = { args: { variant: 'divided' } };

export const InteractiveRows: Story = {
  name: 'ردیف قابل کلیک',
  render: () => (
    <div className="rounded-8 max-w-3xl bg-white p-7">
      <Table>
        <TableBody>
          {ROWS.map((row) => (
            <TableRow key={row.code} onClick={() => undefined}>
              <TableCell>{row.code}</TableCell>
              <TableCell align="end">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
