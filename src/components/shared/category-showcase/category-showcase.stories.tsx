import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BottleIcon, CheeseIcon, FishIcon, LeafIcon } from '@icons';
import { CategoryShowcase } from './category-showcase';

const meta: Meta<typeof CategoryShowcase> = {
  title: 'Shared/CategoryShowcase',
  component: CategoryShowcase,
  parameters: { layout: 'padded' },
};

export default meta;

const iconMap = {
  food: BottleIcon,
  protein: FishIcon,
  dairy: CheeseIcon,
  fruits: LeafIcon,
};

const items = [
  { id: 'food', title: 'مواد غذایی', href: '#', iconKey: 'food' },
  { id: 'protein', title: 'پروتئین', href: '#', iconKey: 'protein' },
  { id: 'dairy', title: 'لبنیات', href: '#', iconKey: 'dairy' },
  { id: 'fruits', title: 'میوه و سبزیجات', href: '#', iconKey: 'fruits' },
  { id: 'snacks', title: 'تنقلات', href: '#', iconKey: 'unknown-key' },
  { id: 'sweets', title: 'شیرینی‌جات', href: '#' },
];

export const WithSoonStrip: StoryObj<typeof CategoryShowcase> = {
  args: {
    title: 'دسته‌بندی کالاها',
    subtitle: 'خرید بر اساس دسته‌بندی',
    soonLabel: 'بزودی',
    items,
    iconMap,
    fallbackIcon: BottleIcon,
  },
};

export const AllInGrid: StoryObj<typeof CategoryShowcase> = {
  args: {
    title: 'دسته‌بندی کالاها',
    items,
    iconMap,
    fallbackIcon: BottleIcon,
  },
};

export const Loading: StoryObj<typeof CategoryShowcase> = {
  args: {
    title: 'دسته‌بندی کالاها',
    subtitle: 'خرید بر اساس دسته‌بندی',
    soonLabel: 'بزودی',
    items: [],
    isLoading: true,
  },
};

export const LoadingFlat: StoryObj<typeof CategoryShowcase> = {
  args: {
    title: 'دسته‌بندی کالاها',
    items: [],
    isLoading: true,
    soonLabel: undefined,
  },
};
