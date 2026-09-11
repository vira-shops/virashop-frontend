import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BestSellersSection } from './best-sellers';

const meta: Meta<typeof BestSellersSection> = {
  title: 'Shared/BestSellersSection',
  component: BestSellersSection,
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const LandingRetailScope: StoryObj<typeof BestSellersSection> = {
  args: {
    link: { label: 'مشاهده همه', href: '/wholesale/best-sellers' },
    className: 'my-11 bg-blue-50 sm:my-10',
  },
};

export const WholesaleScope: StoryObj<typeof BestSellersSection> = {
  args: {
    link: { label: 'مشاهده همه', href: '/wholesale/best-sellers' },
    className: 'my-11 sm:my-10',
  },
};
