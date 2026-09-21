import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProductGallery } from './product-gallery';

const images = [
  { id: '1', src: '/images/products/rice-1.png', alt: 'برنج - نمای اول' },
  { id: '2', src: '/images/products/rice-2.png', alt: 'برنج - نمای دوم' },
  { id: '3', src: '/images/products/rice-3.png', alt: 'برنج - نمای سوم' },
];

const meta: Meta<typeof ProductGallery> = {
  title: 'Shared/ProductGallery',
  component: ProductGallery,
  tags: ['autodocs'],
  args: { images },
};

export default meta;
type Story = StoryObj<typeof ProductGallery>;

export const Default: Story = {};

export const SingleImage: Story = {
  args: { images: [images[0]] },
};
