import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PencilIcon } from '@icons';
import { Button } from '@/components/ui';
import { PageHeading } from './page-heading';

const meta: Meta<typeof PageHeading> = {
  title: 'Shared/PageHeading',
  component: PageHeading,
  tags: ['autodocs'],
  args: { title: 'داشبورد' },
  decorators: [
    (Story) => (
      <div className="max-w-3xl bg-blue-50 p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageHeading>;

export const Basic: Story = {};

export const WithCount: Story = { args: { title: 'اعلان ها', count: 2 } };

export const WithBackAndAction: Story = {
  name: 'بازگشت + اکشن',
  args: {
    title: 'جزئیات سفارش',
    as: 'h2',
    backHref: '#',
    bordered: true,
    actions: (
      <Button variant="ghost" size="xs" href="#" className="text-primary">
        مشاهده فاکتور
      </Button>
    ),
  },
};

export const WithEditAction: Story = {
  name: 'اکشن ویرایش',
  args: {
    title: 'پروفایل',
    actions: (
      <Button variant="ghost" size="xs" rightIcon={<PencilIcon />} className="text-blue-300">
        ویرایش
      </Button>
    ),
  },
};
