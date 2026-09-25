import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatusIcon } from './status-icon';

const meta: Meta<typeof StatusIcon> = {
  title: 'UI/StatusIcon',
  component: StatusIcon,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'radio', options: ['success', 'error', 'warning'] },
    size: { control: 'radio', options: ['sm', 'md'] },
  },
  args: { status: 'success', size: 'md', label: 'پرداخت موفق' },
};

export default meta;
type Story = StoryObj<typeof StatusIcon>;

export const Basic: Story = {};

export const AllStatuses: Story = {
  name: 'همه وضعیت‌ها × اندازه‌ها',
  render: () => (
    <div className="flex flex-col gap-9">
      {(['md', 'sm'] as const).map((size) => (
        <div key={size} className="flex items-center gap-9">
          <StatusIcon status="success" size={size} label="موفق" />
          <StatusIcon status="error" size={size} label="ناموفق" />
          <StatusIcon status="warning" size={size} label="هشدار" />
        </div>
      ))}
    </div>
  ),
};

export const PaymentState: Story = {
  name: 'وضعیت پرداخت',
  render: () => (
    <div className="flex items-center gap-3">
      <StatusIcon status="warning" label="جزئیات خطا" />
      <StatusIcon status="error" label="پرداخت ناموفق" />
    </div>
  ),
};
