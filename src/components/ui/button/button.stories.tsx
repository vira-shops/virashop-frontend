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
    color: { control: 'radio', options: ['primary', 'blue', 'yellow'] },
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    children: 'عنوان دکمه',
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
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['primary', 'blue', 'yellow'] as const).map((color) => (
        <div key={color} className="flex flex-wrap items-center gap-4">
          <span className="w-16 text-sm text-gray-700">{color}</span>
          <Button color={color} variant="fill" disabled>
            پر کردن
          </Button>
          <Button color={color} variant="outline" disabled>
            خط دور
          </Button>
          <Button color={color} variant="ghost" disabled>
            شبح
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button color="primary">Primary</Button>
      <Button color="blue">Blue</Button>
      <Button color="yellow">Yellow</Button>
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

export const AsLink: Story = {
  name: 'به‌صورت لینک (href)',
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button href="/wholesale" color="wholesale">
        فروش عمده
      </Button>
      <Button href="/retail" color="retail">
        فروش خرده
      </Button>
      <Button href="/auth/login" variant="outline">
        ورود
      </Button>
      <Button href="https://example.com" target="_blank" rel="noopener noreferrer" variant="ghost">
        لینک خارجی
      </Button>
    </div>
  ),
};

export const AsLinkIconOnly: Story = {
  name: 'به‌صورت لینک - فقط آیکون',
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button href="/cart" icon={<PlusIcon className="size-5" />} aria-label="سبد خرید" />
      <Button
        href="/auth/login"
        variant="outline"
        icon={<PlusIcon className="size-5" />}
        aria-label="ورود"
      />
    </div>
  ),
};

export const RetailTheme: Story = {
  render: () => (
    <div data-theme="retail" className="flex flex-wrap gap-4 p-4">
      <Button variant="fill">خرده - پر کردن</Button>
      <Button variant="outline">خرده - خط دور</Button>
      <Button variant="ghost">خرده - شبح</Button>
    </div>
  ),
};

export const WholesaleTheme: Story = {
  render: () => (
    <div data-theme="wholesale" className="flex flex-wrap gap-4 p-4">
      <Button variant="fill">عمده - پر کردن</Button>
      <Button variant="outline">عمده - خط دور</Button>
      <Button variant="ghost">عمده - شبح</Button>
    </div>
  ),
};

export const LandingPreview: Story = {
  name: 'Landing (both palettes)',
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="border-retail-600 bg-retail-50 rounded-xl border p-6">
        <p className="text-retail-900 text-lg font-bold">فروش خرده</p>
        <div className="mt-4 flex gap-3">
          <Button className="bg-retail-500 hover:bg-retail-600">ورود به فروشگاه خرده</Button>
        </div>
      </div>
      <div className="border-wholesale-600 bg-wholesale-50 rounded-xl border p-6">
        <p className="text-wholesale-900 text-lg font-bold">فروش عمده</p>
        <div className="mt-4 flex gap-3">
          <Button className="bg-wholesale-500 hover:bg-wholesale-600">ورود به فروشگاه عمده</Button>
        </div>
      </div>
    </div>
  ),
};
