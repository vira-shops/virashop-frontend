import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Radio } from './radio';

const meta: Meta<typeof Radio> = {
  title: 'UI/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
  },
  args: {
    name: 'shipping',
    label: 'ارسال پیشتاز',
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Group: Story = {
  render: function Render(args) {
    const [value, setValue] = React.useState('express');

    return (
      <div className="flex flex-col gap-4">
        {[
          { id: 'express', label: 'ارسال پیشتاز' },
          { id: 'standard', label: 'ارسال با پست معمولی' },
        ].map((option) => (
          <Radio
            {...args}
            key={option.id}
            value={option.id}
            label={option.label}
            checked={value === option.id}
            onChange={() => setValue(option.id)}
          />
        ))}
      </div>
    );
  },
};
