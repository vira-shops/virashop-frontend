import type { ReactNode } from 'react';
import {
  buyerRoleParams,
  getRouteChannel,
  type BuyerRouteParams,
} from '@/features/buyer-dashboard';
import { BuyerDashboardLayout } from '@/layouts/dashboard-layout';

interface LayoutProps extends BuyerRouteParams {
  children: ReactNode;
}

/** Only the known buyer dashboards exist — any other `[role]` is a 404. */
export const dynamicParams = false;
export const generateStaticParams = buyerRoleParams;

/**
 * Persistent buyer-dashboard frame — the menu and header survive navigation
 * between sections. `/dashboard/wholesale-buyer` and `/dashboard/retail-buyer`
 * share every page and differ only by channel config.
 */
export default async function BuyerDashboardRouteLayout({ children, params }: LayoutProps) {
  const channel = await getRouteChannel({ params });

  return <BuyerDashboardLayout channel={channel}>{children}</BuyerDashboardLayout>;
}
