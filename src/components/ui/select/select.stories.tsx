import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { SVGProps } from 'react';
import { Select } from './select';

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path strokeLinecap="round" d="m20 20-3.5-3.5" />
  </svg>
);

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['outline', 'fill', 'ghost'] },
    color: { control: 'radio', options: ['primary', 'blue', 'yellow'] },
    state: { control: 'radio', options: ['error', 'success', 'warning'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = (
  <>
    <option value="tehran">تهران</option>
    <option value="mashhad">مشهد</option>
    <option value="shiraz">شیراز</option>
  </>
);

export const Basic: Story = {
  args: {
    placeholder: 'شهر خود را انتخاب کنید',
    children: options,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-11">
      <Select variant="outline" placeholder="خط دور">
        {options}
      </Select>
      <Select variant="fill" placeholder="پر شده">
        {options}
      </Select>
      <Select variant="ghost" placeholder="شبح">
        {options}
      </Select>
    </div>
  ),
};

export const WithLabelAndMessage: Story = {
  render: () => (
    <div className="flex flex-col gap-11">
      <Select label="شهر" placeholder="انتخاب کنید" inputMessage="شهر انتخاب شد" state="success">
        {options}
      </Select>
      <Select
        label="شهر"
        placeholder="انتخاب کنید"
        inputMessage="انتخاب شهر الزامی است"
        state="error"
      >
        {options}
      </Select>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-11">
      <Select state="error" placeholder="خطا" inputMessage="پیام خطا">
        {options}
      </Select>
      <Select state="success" placeholder="موفق" inputMessage="پیام موفقیت">
        {options}
      </Select>
      <Select state="warning" placeholder="هشدار" inputMessage="پیام هشدار">
        {options}
      </Select>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-11">
      <Select size="sm" placeholder="کوچک">
        {options}
      </Select>
      <Select size="md" placeholder="متوسط">
        {options}
      </Select>
      <Select size="lg" placeholder="بزرگ">
        {options}
      </Select>
    </div>
  ),
};

export const Searchable: Story = {
  render: () => (
    <div className="w-72">
      <Select searchable placeholder="جستجوی شهر...">
        {options}
      </Select>
    </div>
  ),
};

export const SearchableWithRightIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-11">
      <div className="w-72">
        <Select searchable placeholder="با آیکن پیش‌فرض جستجو">
          {options}
        </Select>
      </div>
      <div className="w-72">
        <Select searchable rightIcon={<SearchIcon />} placeholder="با آیکن سفارشی">
          {options}
        </Select>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-11">
      <Select variant="outline" disabled placeholder="غیرفعال">
        {options}
      </Select>
      <Select variant="fill" disabled placeholder="غیرفعال">
        {options}
      </Select>
      <Select variant="ghost" disabled placeholder="غیرفعال">
        {options}
      </Select>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-80">
      <Select fullWidth label="استان" placeholder="تمام عرض">
        {options}
      </Select>
    </div>
  ),
};
