import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StoreHeader } from './store-header';
import { wholesaleConfig } from './wholesale-config';
import { retailConfig } from './retail-config';

const meta: Meta<typeof StoreHeader> = {
  title: 'Layout/StoreHeader',
  component: StoreHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: { type: 'code' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StoreHeader>;

export const WholesaleDesktop: Story = {
  name: 'عمده — دسکتاپ',
  args: { config: wholesaleConfig },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div data-theme="wholesale">
        <Story />
      </div>
    ),
  ],
};

export const WholesaleMobile: Story = {
  name: 'عمده — موبایل',
  args: { config: wholesaleConfig },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  decorators: [
    (Story) => (
      <div data-theme="wholesale">
        <Story />
      </div>
    ),
  ],
};

export const RetailDesktop: Story = {
  name: 'خرده — دسکتاپ',
  args: { config: retailConfig },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div data-theme="retail">
        <Story />
      </div>
    ),
  ],
};

export const RetailMobile: Story = {
  name: 'خرده — موبایل',
  args: { config: retailConfig },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  decorators: [
    (Story) => (
      <div data-theme="retail">
        <Story />
      </div>
    ),
  ],
};
