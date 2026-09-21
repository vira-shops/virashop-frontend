import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ValueSlider } from './value-slider';
import { toFaDigits } from '@/utils/format';

const meta: Meta<typeof ValueSlider> = {
  title: 'UI/ValueSlider',
  component: ValueSlider,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'radio', options: ['primary', 'blue'] },
  },
  args: {
    min: 1,
    max: 120,
    defaultValue: 45,
    'aria-label': 'مدت پرداخت',
    formatLabel: (value: number) => `${toFaDigits(value)} روز`,
  },
  decorators: [
    (Story) => (
      <div className="w-96 p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ValueSlider>;

export const Default: Story = {};

export const Blue: Story = {
  args: { color: 'blue' },
};

export const Shrinks: Story = {
  args: {
    min: 1,
    max: 45,
    defaultValue: 3,
    'aria-label': 'تعداد شل',
    formatLabel: (value: number) => `${toFaDigits(value)} شل`,
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};
