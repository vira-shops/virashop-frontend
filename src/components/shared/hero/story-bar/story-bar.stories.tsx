import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StoryBar } from './story-bar';

const stories = [
  { src: '/images/landing/hero/story-1.png', title: 'فروش ویژه' },
  { src: '/images/landing/hero/story-2.png', title: 'تخفیف عمده' },
  { src: '/images/landing/hero/story-3.png', title: 'محصولات جدید' },
];

const meta: Meta<typeof StoryBar> = {
  title: 'Shared/Hero/StoryBar',
  component: StoryBar,
  parameters: { layout: 'padded' },
};

export default meta;

export const Default: StoryObj<typeof StoryBar> = {
  args: { stories },
};

export const Empty: StoryObj<typeof StoryBar> = {
  args: { stories: [] },
};
