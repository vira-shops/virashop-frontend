import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { BasketIcon, HeartIcon, SearchIcon } from '@icons';
import { UserActions } from './user-actions';

const actions = [
  { icon: <SearchIcon />, ariaLabel: 'جستجو' },
  { icon: <HeartIcon />, ariaLabel: 'علاقه‌مندی‌ها', href: '/retail/favorites' },
  { icon: <BasketIcon />, ariaLabel: 'سبد خرید', href: '/cart' },
];

const meta: Meta<typeof UserActions> = {
  title: 'Shared/Header/UserActions',
  component: UserActions,
  parameters: { layout: 'padded' },
};

export default meta;

export const Default: StoryObj<typeof UserActions> = {
  args: { actions },
};
