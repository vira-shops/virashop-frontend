import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BigOfferSection } from './big-offer';

const meta: Meta<typeof BigOfferSection> = {
  title: 'Shared/BigOfferSection',
  component: BigOfferSection,
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const LandingScope: StoryObj<typeof BigOfferSection> = {
  args: {
    link: { label: 'مشاهده همه', href: '/wholesale/offers' },
    className: 'my-11 bg-blue-50 sm:my-10',
  },
};

export const RetailScope: StoryObj<typeof BigOfferSection> = {
  args: {
    link: { label: 'مشاهده همه', href: '/wholesale/offers' },
    className: 'my-14 bg-blue-50 sm:my-20',
  },
};
