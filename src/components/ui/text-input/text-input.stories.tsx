import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { SVGProps } from 'react';
import { TextInput } from './text-input';

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path strokeLinecap="round" d="m20 20-3.5-3.5" />
  </svg>
);

const meta: Meta<typeof TextInput> = {
  title: 'UI/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['outline', 'fill', 'ghost'] },
    color: { control: 'radio', options: ['primary', 'blue', 'yellow'] },
    state: { control: 'radio', options: ['error', 'success', 'warning'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Basic: Story = {
  args: {
    placeholder: 'جست و جو...',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextInput variant="outline" placeholder="خط دور" />
      <TextInput variant="fill" placeholder="پر شده" />
      <TextInput variant="ghost" placeholder="شبح" />
    </div>
  ),
};

export const WithLabelAndMessage: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextInput
        label="ایمیل"
        placeholder="example@mail.com"
        inputMessage="ایمیل معتبر است"
        state="success"
      />
      <TextInput
        label="ایمیل"
        placeholder="example@mail.com"
        inputMessage="ایمیل معتبر نیست"
        state="error"
      />
      <TextInput
        label="کد تخفیف"
        placeholder="کد را وارد کنید"
        inputMessage="کد نزدیک به انقضا است"
        state="warning"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <TextInput state="error" placeholder="خطا" inputMessage="پیام خطا" />
      <TextInput state="success" placeholder="موفق" inputMessage="پیام موفقیت" />
      <TextInput state="warning" placeholder="هشدار" inputMessage="پیام هشدار" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextInput size="sm" placeholder="کوچک" />
      <TextInput size="md" placeholder="متوسط" />
      <TextInput size="lg" placeholder="بزرگ" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <TextInput rightIcon={<SearchIcon />} placeholder="آیکن راست" />
      <TextInput leftIcon={<SearchIcon />} placeholder="آیکن چپ" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <TextInput variant="outline" disabled placeholder="غیرفعال" />
      <TextInput variant="fill" disabled placeholder="غیرفعال" />
      <TextInput variant="ghost" disabled placeholder="غیرفعال" />
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-80">
      <TextInput fullWidth label="نشانی" placeholder="تمام عرض" />
    </div>
  ),
};
