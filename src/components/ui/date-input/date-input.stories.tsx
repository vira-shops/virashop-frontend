import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { DateInput } from './date-input';

const meta: Meta<typeof DateInput> = {
  title: 'UI/DateInput',
  component: DateInput,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['outline', 'fill', 'ghost'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    state: { control: 'radio', options: [undefined, 'error', 'success', 'warning'] },
    disabled: { control: 'boolean' },
  },
  args: { label: 'تاریخ تولد', fullWidth: true },
  decorators: [
    (Story) => (
      <div className="min-h-96 max-w-sm p-10">
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    function Controlled() {
      const [value, setValue] = React.useState<string | null>(args.value ?? null);

      return (
        <div className="flex flex-col gap-5">
          <DateInput {...args} value={value} onChange={setValue} />
          <code className="text-caption-md text-gray-700">value: {String(value)}</code>
        </div>
      );
    }

    return <Controlled />;
  },
};

export default meta;
type Story = StoryObj<typeof DateInput>;

export const Empty: Story = {};

export const WithValue: Story = { args: { value: '1979-08-18' } };

export const Bounded: Story = {
  name: 'بازه مجاز (min / max)',
  args: { label: 'تاریخ سفارش', minDate: '2021-08-01', maxDate: '2021-08-31' },
};

export const States: Story = {
  name: 'وضعیت‌ها',
  render: () => (
    <div className="flex flex-col gap-10">
      <DateInput label="خطا" state="error" inputMessage="تاریخ الزامی است" />
      <DateInput label="موفق" state="success" value="2021-08-12" />
      <DateInput label="غیرفعال" disabled value="2021-08-12" />
    </div>
  ),
};

export const RetailTheme: Story = {
  name: 'تم خرده (retail)',
  decorators: [
    (Story) => (
      <div data-theme="retail">
        <Story />
      </div>
    ),
  ],
};
