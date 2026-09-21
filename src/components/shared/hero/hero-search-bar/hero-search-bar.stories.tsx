import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeroSearchBar } from './hero-search-bar';

const meta: Meta<typeof HeroSearchBar> = {
  title: 'Shared/Hero/HeroSearchBar',
  component: HeroSearchBar,
  parameters: { layout: 'padded' },
};

export default meta;

export const Default: StoryObj<typeof HeroSearchBar> = {};

export const CustomPlaceholder: StoryObj<typeof HeroSearchBar> = {
  args: { placeholder: 'جستجوی محصول در فروشگاه خرده' },
};

export const WithSuggestionsDropdown: StoryObj<typeof HeroSearchBar> = {
  args: {
    hrefForCategory: (slug: string) => `/retail/category/${slug}`,
    hrefForSearch: (q: string) => `/retail/search?q=${encodeURIComponent(q)}`,
  },
};
