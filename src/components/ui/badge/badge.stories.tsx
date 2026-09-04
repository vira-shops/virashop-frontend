import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { SVGProps } from 'react';
import { Badge } from './badge';

const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
  </svg>
);

const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
  </svg>
);

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['fill', 'outline', 'soft'] },
    color: {
      control: 'select',
      options: [
        'primary',
        'warning-red',
        'warning-green',
        'warning-blue',
        'yellow',
        'blue',
        'gray',
        'dark',
      ],
    },
    size: { control: 'radio', options: ['xs', 'sm', 'md'] },
    radius: { control: 'radio', options: ['sm', 'md', 'full'] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Basic: Story = {
  args: {
    children: '۳۰٪ تخفیف',
    color: 'warning-red',
    variant: 'fill',
  },
  render: (args) => <Badge {...args}>{args.children}</Badge>,
};

export const Variants: Story = {
  name: 'انواع ظاهر',
  render: () => (
    <div className="flex flex-wrap items-center gap-9">
      <Badge variant="fill" color="primary">
        Fill
      </Badge>
      <Badge variant="outline" color="primary">
        Outline
      </Badge>
      <Badge variant="soft" color="primary">
        Soft
      </Badge>
    </div>
  ),
};

export const Colors: Story = {
  name: 'رنگ‌ها',
  render: () => (
    <div className="flex flex-col gap-11">
      <div className="flex flex-wrap items-center gap-5">
        <Badge variant="fill">primary</Badge>
        <Badge variant="fill" color="warning-red">
          warning-red
        </Badge>
        <Badge variant="fill" color="warning-green">
          warning-green
        </Badge>
        <Badge variant="fill" color="warning-blue">
          warning-blue
        </Badge>
        <Badge variant="fill" color="yellow">
          yellow
        </Badge>
        <Badge variant="fill" color="blue">
          blue
        </Badge>
        <Badge variant="fill" color="gray">
          gray
        </Badge>
        <Badge variant="fill" color="dark">
          dark
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <Badge variant="outline">primary</Badge>
        <Badge variant="outline" color="warning-red">
          warning-red
        </Badge>
        <Badge variant="outline" color="warning-green">
          warning-green
        </Badge>
        <Badge variant="outline" color="warning-blue">
          warning-blue
        </Badge>
        <Badge variant="outline" color="yellow">
          yellow
        </Badge>
        <Badge variant="outline" color="blue">
          blue
        </Badge>
        <Badge variant="outline" color="gray">
          gray
        </Badge>
        <Badge variant="outline" color="dark">
          dark
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <Badge variant="soft">primary</Badge>
        <Badge variant="soft" color="warning-red">
          warning-red
        </Badge>
        <Badge variant="soft" color="warning-green">
          warning-green
        </Badge>
        <Badge variant="soft" color="warning-blue">
          warning-blue
        </Badge>
        <Badge variant="soft" color="yellow">
          yellow
        </Badge>
        <Badge variant="soft" color="blue">
          blue
        </Badge>
        <Badge variant="soft" color="gray">
          gray
        </Badge>
        <Badge variant="soft" color="dark">
          dark
        </Badge>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  name: 'اندازه‌ها',
  render: () => (
    <div className="flex flex-wrap items-center gap-9">
      <Badge size="xs">XS</Badge>
      <Badge size="sm">SM</Badge>
      <Badge size="md">MD</Badge>
    </div>
  ),
};

export const Radii: Story = {
  name: 'گردی گوشه',
  render: () => (
    <div className="flex flex-wrap items-center gap-9">
      <Badge radius="sm">sm</Badge>
      <Badge radius="md">md</Badge>
      <Badge radius="full">full (pill)</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  name: 'با آیکون',
  render: () => (
    <div className="flex flex-wrap items-center gap-9">
      <Badge rightIcon={<PlusIcon className="size-9" />}>جدید</Badge>
      <Badge color="warning-green" leftIcon={<CheckIcon className="size-9" />}>
        موجود
      </Badge>
      <Badge color="warning-red" variant="soft" rightIcon={<PlusIcon className="size-9" />}>
        ۳۰٪
      </Badge>
    </div>
  ),
};

export const UseCases: Story = {
  name: 'کاربردها',
  render: () => (
    <div className="flex flex-col gap-11">
      <div className="flex flex-wrap items-center gap-5">
        <span className="text-caption-md text-gray-700">تخفیف:</span>
        <Badge color="warning-red" variant="fill">
          ۳۰٪
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <span className="text-caption-md text-gray-700">وضعیت:</span>
        <Badge color="warning-green" variant="soft" leftIcon={<CheckIcon className="size-9" />}>
          موجود در انبار
        </Badge>
        <Badge color="warning-red" variant="soft">
          ناموجود
        </Badge>
        <Badge color="yellow" variant="soft">
          محدود
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <span className="text-caption-md text-gray-700">دسته‌بندی:</span>
        <Badge variant="outline">لبنیات</Badge>
        <Badge variant="outline">خشکبار</Badge>
        <Badge variant="outline">نوشیدنی</Badge>
      </div>
    </div>
  ),
};

export const RetailTheme: Story = {
  name: 'تم خرده (retail)',
  render: () => (
    <div data-theme="retail" className="flex flex-wrap items-center gap-9 p-11">
      <Badge color="primary">retail primary</Badge>
      <Badge color="primary" variant="outline">
        retail outline
      </Badge>
      <Badge color="primary" variant="soft">
        retail soft
      </Badge>
    </div>
  ),
};

export const WholesaleTheme: Story = {
  name: 'تم عمده (wholesale)',
  render: () => (
    <div data-theme="wholesale" className="flex flex-wrap items-center gap-9 p-11">
      <Badge color="primary">wholesale primary</Badge>
      <Badge color="primary" variant="outline">
        wholesale outline
      </Badge>
      <Badge color="primary" variant="soft">
        wholesale soft
      </Badge>
    </div>
  ),
};
