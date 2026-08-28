import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LandingHeader } from './landing-header';

const meta: Meta<typeof LandingHeader> = {
  title: 'Layout/LandingHeader',
  component: LandingHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: { type: 'code' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LandingHeader>;

export const Desktop: Story = {
  name: 'دسکتاپ',
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
};

export const Mobile: Story = {
  name: 'موبایل',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
