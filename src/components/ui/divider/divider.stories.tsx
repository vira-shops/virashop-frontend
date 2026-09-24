import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Divider } from './divider';

const meta: Meta<typeof Divider> = {
  title: 'UI/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['solid', 'dashed'] },
  },
  args: { variant: 'solid' },
  decorators: [
    (Story) => (
      <div className="max-w-xl p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Plain: Story = {};

export const WithLabel: Story = { args: { label: 'خوانده شده' } };

export const Dashed: Story = { args: { variant: 'dashed', label: 'خوانده شده' } };
