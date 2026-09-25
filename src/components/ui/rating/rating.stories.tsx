import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Rating } from './rating';

const meta: Meta<typeof Rating> = {
  title: 'UI/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
  args: { value: 4, size: 'sm' },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Basic: Story = {};

export const Values: Story = {
  name: 'مقادیر',
  render: () => (
    <div className="flex flex-col gap-5">
      {[0, 1, 2, 3, 4, 5].map((value) => (
        <Rating key={value} value={value} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  name: 'اندازه‌ها',
  render: () => (
    <div className="flex flex-col gap-5">
      <Rating value={4} size="sm" />
      <Rating value={4} size="md" />
      <Rating value={4} size="lg" />
    </div>
  ),
};
