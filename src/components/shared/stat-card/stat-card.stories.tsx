import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BoxIcon } from '@icons';
import { StatCard } from './stat-card';

const meta: Meta<typeof StatCard> = {
  title: 'Shared/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  args: { label: 'تحویل شده', value: 14, icon: <BoxIcon /> },
  decorators: [
    (Story) => (
      <div className="max-w-xs bg-blue-50 p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Basic: Story = {};

export const AsLink: Story = { args: { href: '#' } };

export const Loading: Story = { args: { loading: true } };

export const Row: Story = {
  name: 'ردیف داشبورد',
  decorators: [
    (Story) => (
      <div className="max-w-4xl bg-blue-50 p-10">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="grid grid-cols-3 gap-7">
      <StatCard label="تحویل شده" value={14} icon={<BoxIcon />} />
      <StatCard label="درحال پردازش" value={3} icon={<BoxIcon />} />
      <StatCard label="لغو شده" value={0} icon={<BoxIcon />} />
    </div>
  ),
};
