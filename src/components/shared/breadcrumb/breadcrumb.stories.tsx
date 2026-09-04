import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Breadcrumb } from './breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Shared/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Basic: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'خانه', href: '/' },
        { label: 'فروشگاه عمده', href: '/wholesale' },
        { label: 'دسته‌بندی‌ها', href: '/wholesale/categories' },
        { label: 'آجیل و خشکبار' },
      ]}
    />
  ),
};

export const SingleItem: Story = {
  render: () => <Breadcrumb items={[{ label: 'خانه' }]} />,
};

export const AllPlain: Story = {
  render: () => <Breadcrumb items={[{ label: 'سبد خرید' }, { label: 'تسویه حساب' }]} />,
};
