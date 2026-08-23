import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    children: 'دکمه',
    variant: 'fill',
  },
  render: (args) => <Button {...args}>{args.children}</Button>,
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="fill">Fill</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};
