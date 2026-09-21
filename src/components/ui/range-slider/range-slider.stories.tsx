import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RangeSlider } from './range-slider';

const toToman = (value: number) => `${value.toLocaleString('fa-IR')} تومان`;

const meta: Meta<typeof RangeSlider> = {
  title: 'UI/RangeSlider',
  component: RangeSlider,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'blue'] },
  },
  args: {
    min: 0,
    max: 5_000_000,
    step: 50_000,
    defaultValue: [0, 2_540_000],
    formatLabel: toToman,
  },
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {};

export const Blue: Story = {
  args: { color: 'blue' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
