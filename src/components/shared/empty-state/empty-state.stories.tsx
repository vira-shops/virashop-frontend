import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '@/components/ui';
import { EmptyState } from './empty-state';

const meta: Meta<typeof EmptyState> = {
  title: 'Shared/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'radio', options: ['card', 'inline'] } },
  args: { message: 'متاسفانه کالایی وجود', highlight: 'ندارد' },
  decorators: [
    (Story) => (
      <div className="max-w-3xl bg-blue-50 p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Card: Story = {};

export const Inline: Story = {
  args: { variant: 'inline', message: 'متاسفانه سفارشی وجود' },
};

export const WithAction: Story = {
  args: {
    action: (
      <Button size="xs" href="#">
        رفتن به فروشگاه
      </Button>
    ),
  },
};
