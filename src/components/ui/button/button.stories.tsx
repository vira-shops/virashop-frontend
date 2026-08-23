import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { SVGProps } from 'react';
import { Button } from './button';

const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
  </svg>
);

const ArrowLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['fill', 'outline', 'ghost'] },
    color: { control: 'radio', options: ['primary', 'blue'] },
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    children: 'دکمه',
    variant: 'fill',
  },
  render: (args) => <Button {...args}>{args.children}</Button>,
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="fill">Fill</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="fill" disabled>
        Disabled
      </Button>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button color="primary">Primary</Button>
      <Button color="blue">Blue</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="md">MD</Button>
      <Button size="lg">LG</Button>
      <Button size="xl">XL</Button>
      <Button size="xxl">XXL</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button rightIcon={<PlusIcon className="size-5" />}>آیکن راست</Button>
      <Button leftIcon={<ArrowLeftIcon className="size-5" />}>آیکن چپ</Button>
      <Button icon={<PlusIcon className="size-5" />} aria-label="add" />
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-80">
      <Button fullWidth>تمام عرض</Button>
    </div>
  ),
};
