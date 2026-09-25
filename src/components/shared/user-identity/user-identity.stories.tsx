import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UserIdentity } from './user-identity';

const meta: Meta<typeof UserIdentity> = {
  title: 'Shared/UserIdentity',
  component: UserIdentity,
  tags: ['autodocs'],
  args: { name: 'حسین حیدری', subtitle: 'فروشگاه ویرا شاپس' },
  decorators: [
    (Story) => (
      <div className="bg-primary rounded-8 p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserIdentity>;

export const Placeholder: Story = {};

export const WithPhoto: Story = { args: { avatarSrc: '/images/landing/hero/story-1.png' } };

export const Compact: Story = { args: { compact: true, avatarSize: 'xs' } };

export const OnLightSurface: Story = {
  name: 'روی سطح روشن',
  args: { nameClassName: 'text-blue-900', subtitleClassName: 'text-blue-300' },
  decorators: [
    (Story) => (
      <div className="rounded-8 bg-white p-10">
        <Story />
      </div>
    ),
  ],
};
