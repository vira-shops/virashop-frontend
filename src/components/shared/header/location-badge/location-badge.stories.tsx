import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LocationBadge } from './index';

const meta: Meta<typeof LocationBadge> = {
  title: 'Shared/Header/LocationBadge',
  component: LocationBadge,
  parameters: { layout: 'padded' },
};

export default meta;

export const Default: StoryObj<typeof LocationBadge> = {
  args: { city: 'تهران' },
};
