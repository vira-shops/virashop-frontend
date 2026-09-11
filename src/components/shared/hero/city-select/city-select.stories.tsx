import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CitySelect } from './city-select';

const cities = [
  { value: 'tehran', label: 'تهران' },
  { value: 'mashhad', label: 'مشهد' },
  { value: 'isfahan', label: 'اصفهان' },
];

const meta: Meta<typeof CitySelect> = {
  title: 'Shared/Hero/CitySelect',
  component: CitySelect,
  parameters: { layout: 'padded' },
  args: { cities },
};

export default meta;

export const Default: StoryObj<typeof CitySelect> = {};

export const Disabled: StoryObj<typeof CitySelect> = {
  args: { disabled: true },
};

export const Preselected: StoryObj<typeof CitySelect> = {
  args: { defaultValue: 'mashhad' },
};
