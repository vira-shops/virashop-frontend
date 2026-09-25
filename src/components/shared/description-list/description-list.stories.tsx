import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatusIcon } from '@/components/ui';
import { DescriptionList } from './description-list';

const ITEMS = [
  { label: 'کد پیگیری', value: '۱۲۳۴۵۶۷۸۹۱۵۴۲' },
  { label: 'نوع پرداخت', value: 'آنلاین' },
  { label: 'ارسال با', value: 'پیشتاز' },
  { label: 'هزینه ارسال', value: 'رایگان' },
  { label: 'قیمت', value: '۲٬۵۴۰٬۰۰۰ تومان' },
  { label: 'قیمت با تخفیف', value: '۲٬۵۴۰٬۰۰۰ تومان' },
  { label: 'وضعیت سفارش', value: 'درحال پیگیری' },
  {
    label: 'وضعیت پرداخت',
    value: (
      <>
        <StatusIcon status="error" label="ناموفق" />
        <StatusIcon status="warning" label="جزئیات" />
      </>
    ),
  },
  { label: 'تاریخ', value: '۱۴۰۰/۵/۲۱' },
];

const meta: Meta<typeof DescriptionList> = {
  title: 'Shared/DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
  args: { items: ITEMS },
  decorators: [
    (Story) => (
      <div className="rounded-8 max-w-4xl bg-white p-7">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DescriptionList>;

export const Stacked: Story = { name: 'موبایل (یک ستونه)' };

export const Grid: Story = {
  name: 'دسکتاپ (چهار ستونه با جداکننده)',
  args: {
    className: 'grid-cols-4',
    itemClassName: 'justify-start border-e pe-7 [&:nth-child(4n)]:border-e-0',
  },
};
