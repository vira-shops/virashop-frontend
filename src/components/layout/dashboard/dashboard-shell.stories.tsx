import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PATHS } from '@/routes/paths';
import { buyerDashboardConfig } from './buyer-config';
import { DashboardShell } from './dashboard-shell';

const meta: Meta<typeof DashboardShell> = {
  title: 'Layout/DashboardShell',
  component: DashboardShell,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true, navigation: { pathname: PATHS.DASHBOARD.BUYER.ROOT } },
  },
  args: {
    config: buyerDashboardConfig,
    user: { name: 'حسین حیدری' },
    onLogout: () => undefined,
    children: (
      <div className="rounded-8 flex h-96 items-center justify-center border border-dashed border-blue-200 text-blue-300">
        محتوای صفحه
      </div>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof DashboardShell>;

export const Buyer: Story = {};

export const WithPhoto: Story = {
  args: { user: { name: 'حسین حیدری', avatarSrc: '/images/landing/hero/story-1.png' } },
};

export const NestedRouteActive: Story = {
  name: 'مسیر تو در تو (جزئیات سفارش)',
  parameters: {
    nextjs: { appDirectory: true, navigation: { pathname: PATHS.DASHBOARD.BUYER.ORDER(1) } },
  },
};

export const RetailTheme: Story = {
  name: 'تم خرده (پیکربندی فروشنده)',
  args: { config: { ...buyerDashboardConfig, theme: 'retail' } },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
