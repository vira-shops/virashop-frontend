import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SiteFooter } from './site-footer';

const meta: Meta<typeof SiteFooter> = {
  title: 'Shared/SiteFooter',
  component: SiteFooter,
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Default: StoryObj<typeof SiteFooter> = {};
