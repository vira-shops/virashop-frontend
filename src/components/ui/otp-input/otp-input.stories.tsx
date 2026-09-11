import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { OtpInput } from './otp-input';

const meta: Meta<typeof OtpInput> = {
  title: 'UI/OtpInput',
  component: OtpInput,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    state: { control: 'radio', options: ['error', 'success'] },
  },
};

export default meta;
type Story = StoryObj<typeof OtpInput>;

export const Basic: Story = {
  args: {
    label: 'کد تایید',
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-11">
      <OtpInput state="error" message="کد تایید نادرست است" />
      <OtpInput state="success" message="کد تایید معتبر است" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-11">
      <OtpInput size="sm" />
      <OtpInput size="md" />
      <OtpInput size="lg" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '123456',
  },
};
