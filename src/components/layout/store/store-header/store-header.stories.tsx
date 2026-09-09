import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
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

// Storybook decorator factory — wraps the story in a `<div data-theme=...>` so
// each story variant can pick its storefront theme independently. The inner
// arrow is a HOC wrapper, not a standalone component, so the `display-name`
// lint rule is a false positive here.
const withTheme =
  (theme: 'wholesale' | 'retail') =>
  // eslint-disable-next-line react/display-name
  (Story: () => React.ReactNode): React.ReactElement => (
    <div data-theme={theme}>
      <Story />
    </div>
  );

export const WholesaleDesktop: Story = {
  name: 'عمده — دسکتاپ',
  args: { config: wholesaleConfig },
  parameters: { viewport: { defaultViewport: 'desktop' } },
  decorators: [withTheme('wholesale')],
};

export const WholesaleMobile: Story = {
  name: 'عمده — موبایل',
  args: { config: wholesaleConfig },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  decorators: [withTheme('wholesale')],
};

export const RetailDesktop: Story = {
  name: 'خرده — دسکتاپ',
  args: { config: retailConfig },
  parameters: { viewport: { defaultViewport: 'desktop' } },
  decorators: [withTheme('retail')],
};

export const RetailMobile: Story = {
  name: 'خرده — موبایل',
  args: { config: retailConfig },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  decorators: [withTheme('retail')],
};
