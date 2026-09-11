import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Logo } from './logo';

const meta: Meta<typeof Logo> = {
  title: 'Shared/Header/Logo',
  component: Logo,
  parameters: { layout: 'padded' },
};

export default meta;

export const Default: StoryObj<typeof Logo> = {
  args: { src: '/images/landing/header/header-logo.svg', alt: 'ویراشاپ' },
};

export const CustomHref: StoryObj<typeof Logo> = {
  args: {
    src: '/images/landing/header/header-logo.svg',
    alt: 'ویراشاپ خرده',
    href: '/retail',
  },
};
