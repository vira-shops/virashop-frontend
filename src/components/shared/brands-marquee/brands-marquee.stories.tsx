import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BrandsMarquee } from './brands-marquee';

const meta: Meta<typeof BrandsMarquee> = {
  title: 'Shared/BrandsMarquee',
  component: BrandsMarquee,
  parameters: { layout: 'padded' },
};

export default meta;

const brands = [
  { id: '1', logo: '/images/landing/brands/brand-1.png', name: 'برند یک' },
  {
    id: '2',
    logo: '/images/landing/brands/brand-2.png',
    name: 'برند دو',
    logoAlt: 'لوگوی برند دو',
  },
  { id: '3', logo: '/images/landing/brands/brand-3.png', name: 'برند سه' },
  { id: '4', logo: '/images/landing/brands/brand-4.png', name: 'برند چهار' },
  { id: '5', logo: '/images/landing/brands/brand-5.png', name: 'برند پنج' },
  { id: '6', logo: '/images/landing/brands/brand-6.png', name: 'برند شش' },
];

export const ThreeRows: StoryObj<typeof BrandsMarquee> = {
  args: {
    brands,
    ctaLabel: 'برندهای همکار',
    ariaLabel: 'برندهای همکار',
  },
};

export const TwoRows: StoryObj<typeof BrandsMarquee> = {
  args: {
    brands,
    ctaLabel: 'برندهای محبوب',
    rowCount: 2,
  },
};

export const WithCtaLink: StoryObj<typeof BrandsMarquee> = {
  args: {
    brands,
    ctaLabel: 'مشاهده برندها',
    ctaHref: '/wholesale/brands',
  },
};

export const NoCtaSmallLogos: StoryObj<typeof BrandsMarquee> = {
  name: 'No CTA, small logos (retail)',
  args: {
    brands,
    ctaLabel: 'برندهای محبوب',
    showCta: false,
    logoSize: 'sm',
    rowCount: 1,
  },
};
