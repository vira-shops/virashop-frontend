import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CategoryCard } from './category-card';

const meta: Meta<typeof CategoryCard> = {
  title: 'Shared/CategoryCard',
  component: CategoryCard,
  parameters: { layout: 'padded' },
};

export default meta;

export const Default: StoryObj<typeof CategoryCard> = {
  args: {
    title: 'مواد غذایی',
    image: '/images/landing/big-offer/01.png',
    imageAlt: 'مواد غذایی',
  },
};

export const AsLink: StoryObj<typeof CategoryCard> = {
  args: {
    title: 'لبنیات',
    image: '/images/landing/big-offer/03.png',
    imageAlt: 'لبنیات',
    href: '/retail/category/dairy',
  },
};

export const MoreOverlay: StoryObj<typeof CategoryCard> = {
  args: {
    title: 'بیشتر',
    image: '/images/landing/big-offer/02.png',
    moreLabel: '۲۰ دسته‌بندی دیگر',
  },
};
