import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ShopIcon, UserIcon } from '@icons';
import { Tabs } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['fill', 'outline'] },
    color: { control: 'radio', options: ['primary', 'blue', 'yellow', 'retail', 'wholesale'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const ROLE_ITEMS = [
  { value: 'BUYER', label: 'خریدار' },
  { value: 'SELLER', label: 'فروشنده' },
  { value: 'BOTH', label: 'هر دو' },
];

export const Basic: Story = {
  args: {
    items: ROLE_ITEMS,
    'aria-label': 'نقش',
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { value: 'BUYER', label: 'خریدار', icon: <UserIcon className="size-8" /> },
      { value: 'SELLER', label: 'فروشنده', icon: <ShopIcon className="size-8" /> },
    ],
    defaultValue: 'BUYER',
    'aria-label': 'نقش با آیکون',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-11">
      <Tabs items={ROLE_ITEMS} variant="fill" aria-label="پر شده" />
      <Tabs items={ROLE_ITEMS} variant="outline" aria-label="خط دور" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-11">
      <Tabs items={ROLE_ITEMS} color="primary" aria-label="اصلی" />
      <Tabs items={ROLE_ITEMS} color="blue" aria-label="آبی" />
      <Tabs items={ROLE_ITEMS} color="yellow" aria-label="زرد" />
      <Tabs items={ROLE_ITEMS} color="retail" aria-label="خرده" />
      <Tabs items={ROLE_ITEMS} color="wholesale" aria-label="عمده" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-11">
      <Tabs items={ROLE_ITEMS} size="sm" aria-label="کوچک" />
      <Tabs items={ROLE_ITEMS} size="md" aria-label="متوسط" />
      <Tabs items={ROLE_ITEMS} size="lg" aria-label="بزرگ" />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    items: ROLE_ITEMS,
    fullWidth: true,
    'aria-label': 'تمام عرض',
  },
};

export const DisabledItems: Story = {
  args: {
    items: [
      { value: 'BUYER', label: 'خریدار' },
      { value: 'SELLER', label: 'فروشنده', disabled: true },
      { value: 'BOTH', label: 'هر دو' },
    ],
    'aria-label': 'تب غیرفعال',
  },
};

export const FullyDisabled: Story = {
  args: {
    items: ROLE_ITEMS,
    disabled: true,
    'aria-label': 'غیرفعال',
  },
};
