import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    ring: { control: 'boolean' },
  },
  args: { alt: 'حسین حیدری', size: 'md' },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Placeholder: Story = {};

export const WithPhoto: Story = {
  args: { src: '/images/landing/hero/story-1.png' },
};

export const Sizes: Story = {
  name: 'اندازه‌ها',
  render: () => (
    <div className="flex items-end gap-9">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar key={size} size={size} alt={size} />
      ))}
    </div>
  ),
};

export const OnBrandBand: Story = {
  name: 'روی نوار رنگی (ring)',
  render: () => (
    <div className="bg-primary flex gap-9 p-10">
      <Avatar ring size="lg" alt="بدون عکس" />
      <Avatar ring size="lg" alt="با عکس" src="/images/landing/hero/story-1.png" />
    </div>
  ),
};
