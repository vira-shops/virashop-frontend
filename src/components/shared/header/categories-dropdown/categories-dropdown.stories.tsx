import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CategoriesDropdown } from './index';

const meta: Meta<typeof CategoriesDropdown> = {
  title: 'Shared/Header/CategoriesDropdown',
  component: CategoriesDropdown,
  parameters: { layout: 'padded' },
};

export default meta;

export const Default: StoryObj<typeof CategoriesDropdown> = {};
