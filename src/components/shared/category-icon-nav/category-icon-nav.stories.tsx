import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CategoryIconNav } from './category-icon-nav';

const items = [
  { id: 1, title: 'مرغ و ماکیان', image: '/images/categories/chicken.png' },
  { id: 2, title: 'گوشت قرمز', image: '/images/categories/meat.png' },
  { id: 3, title: 'ماهی و میگو', image: '/images/categories/fish.png' },
  { id: 4, title: 'فرآورده‌های گوشتی', image: '/images/categories/deli.png' },
];

const meta: Meta<typeof CategoryIconNav> = {
  title: 'Shared/CategoryIconNav',
  component: CategoryIconNav,
  tags: ['autodocs'],
  args: { items, activeId: 2 },
};

export default meta;
type Story = StoryObj<typeof CategoryIconNav>;

export const Default: Story = {};
