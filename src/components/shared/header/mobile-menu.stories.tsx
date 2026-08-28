import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { MobileMenu } from './mobile-menu';
import type { HeaderCTA, NavItem, UserAction } from './types';
import { SearchIcon, UserIcon, BasketIcon } from '@icons';
import { Button, Typography } from '@/components/ui';
import { Logo } from './logo';
import { UserActions } from './user-actions';
import { SearchBar } from './search-bar';

const navItems: NavItem[] = [
  { label: 'عمده فروشی', href: '/wholesale' },
  { label: 'خرده فروشی', href: '/retail' },
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس با ما', href: '/contact' },
  { label: 'بلاگ', href: '/blog' },
];

const navItemsWithChildren: NavItem[] = [
  {
    label: 'عمده فروشی',
    href: '/wholesale',
    children: [
      { label: 'دسته‌بندی‌ها', href: '/wholesale/categories' },
      { label: 'پرفروش‌ها', href: '/wholesale/best-sellers' },
      { label: 'تخفیف‌ها', href: '/wholesale/offers' },
    ],
  },
  {
    label: 'خرده فروشی',
    href: '/retail',
    children: [
      { label: 'دسته‌بندی‌ها', href: '/retail/categories' },
      { label: 'پرفروش‌ها', href: '/retail/best-sellers' },
    ],
  },
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس با ما', href: '/contact' },
];

const userActions: UserAction[] = [
  { icon: <SearchIcon />, ariaLabel: 'جستجو' },
  { icon: <UserIcon />, ariaLabel: 'ورود', href: '/auth/login' },
  { icon: <BasketIcon />, ariaLabel: 'سبد خرید', href: '/cart' },
];

const landingCtas: HeaderCTA[] = [
  { label: 'فروش خرده', href: '/retail', color: 'retail' },
  { label: 'فروش عمده', href: '/wholesale', color: 'wholesale' },
];

const logo = { src: '/images/landing/header/header-logo.svg', alt: 'ویراشاپ' };

const meta: Meta<typeof MobileMenu> = {
  title: 'Shared/MobileMenu',
  component: MobileMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      source: { type: 'code' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MobileMenu>;

export const LandingClosed: Story = {
  name: 'لندینگ — بسته (با دکمه همبرگر)',
  args: {
    items: navItems,
    logo,
    ctas: landingCtas,
  },
};

export const LandingDrawer: Story = {
  name: 'لندینگ — کشوی باز (دکمه‌های پایین تمام‌عرض)',
  render: () => <LandingDrawerPreview />,
};

export const WholesaleDrawer: Story = {
  name: 'عمده — کشوی باز (با جستجو و user actions)',
  render: () => (
    <div data-theme="wholesale">
      <StoreDrawerPreview items={navItemsWithChildren} userActions={userActions} showSearch />
    </div>
  ),
};

export const RetailDrawer: Story = {
  name: 'خرده — کشوی باز (با جستجو و user actions)',
  render: () => (
    <div data-theme="retail">
      <StoreDrawerPreview items={navItemsWithChildren} userActions={userActions} showSearch />
    </div>
  ),
};

const LandingDrawerPreview = () => (
  <DrawerShell>
    <DrawerHeader logo={logo} />

    <nav className="flex flex-col pt-4">
      {navItems.map(({ label, href, children }) => (
        <div key={href}>
          <Typography variant="caption-lg" href={href} className="block py-4 pr-8 text-gray-400">
            {label}
          </Typography>
          {children?.map((child) => (
            <Typography
              key={child.href}
              variant="body-sm"
              href={child.href}
              className="block py-2 pr-4 text-gray-700"
            >
              {child.label}
            </Typography>
          ))}
        </div>
      ))}
    </nav>

    <div className="flex w-full flex-col gap-3 border-t border-gray-100 p-4">
      {landingCtas.map(({ label, href, color }) => (
        <Button key={href} color={color} fullWidth>
          {label}
        </Button>
      ))}
    </div>
  </DrawerShell>
);

const StoreDrawerPreview: React.FC<{
  items: NavItem[];
  userActions: UserAction[];
  showSearch: boolean;
}> = ({ items, userActions: actions, showSearch }) => (
  <DrawerShell>
    <DrawerHeader logo={logo} />

    {showSearch && (
      <div className="p-4">
        <SearchBar />
      </div>
    )}

    <nav className="flex flex-col pt-4">
      {items.map(({ label, href, children }) => (
        <div key={href}>
          <Typography variant="caption-lg" href={href} className="block py-4 pr-8 text-gray-400">
            {label}
          </Typography>
          {children?.map((child) => (
            <Typography
              key={child.href}
              variant="body-sm"
              href={child.href}
              className="block py-2 pr-4 text-gray-700"
            >
              {child.label}
            </Typography>
          ))}
        </div>
      ))}
    </nav>

    <div className="border-t border-gray-100 p-4">
      <UserActions actions={actions} />
    </div>
  </DrawerShell>
);

const DrawerHeader: React.FC<{ logo: { src: string; alt: string } }> = ({ logo: l }) => (
  <div className="flex items-center justify-between border-b border-gray-100 p-4">
    <Logo src={l.src} alt={l.alt} />
    <span className="text-caption-md text-gray-400">پیش‌نمایش کشو</span>
  </div>
);

const DrawerShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-svh justify-end bg-black/40">
    <div
      role="dialog"
      aria-modal="true"
      aria-label="منوی موبایل"
      dir="rtl"
      className="flex h-svh w-svw flex-col bg-white shadow-xl sm:w-90"
    >
      {children}
    </div>
  </div>
);
