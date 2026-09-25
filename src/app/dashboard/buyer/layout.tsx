import { BuyerDashboardLayout } from '@/layouts/dashboard-layout';
import type { PropsWithChildren } from '@/types/children';

/** Persistent buyer-dashboard frame — the menu and header survive navigation between sections. */
export default function BuyerDashboardRouteLayout({ children }: PropsWithChildren) {
  return <BuyerDashboardLayout>{children}</BuyerDashboardLayout>;
}
