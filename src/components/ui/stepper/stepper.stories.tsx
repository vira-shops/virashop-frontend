import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Stepper } from './stepper';
import { toFaDigits } from '@/utils/format';

const meta: Meta<typeof Stepper> = {
  title: 'UI/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
  },
  args: {
    value: 3,
    min: 1,
    max: 45,
    unit: 'شل',
    formatValue: toFaDigits,
    'aria-label': 'تعداد شل',
  },
  render: function Render(args) {
    const [value, setValue] = React.useState(args.value);

    return <Stepper {...args} value={value} onChange={setValue} />;
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Units: Story = {
  args: { unit: 'عدد', max: 3, 'aria-label': 'تعداد دانه' },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
