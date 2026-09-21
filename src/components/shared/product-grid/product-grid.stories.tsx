import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProductGrid } from './product-grid';

const items = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  image: { src: '/images/products/01.png', alt: `محصول ${index + 1}` },
  title: `محصول نمونه ${index + 1}`,
  price: '۴۵۰٬۰۰۰',
  action: { label: 'مشاهده', href: '#' },
}));

const meta: Meta<typeof ProductGrid> = {
  title: 'Shared/ProductGrid',
  component: ProductGrid,
  tags: ['autodocs'],
  args: { items },
};

export default meta;
type Story = StoryObj<typeof ProductGrid>;

export const Default: Story = {};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Empty: Story = {
  args: { items: [] },
};
