import { DashboardOverview } from '@/features/buyer-dashboard';
import { dashboardMetadata } from '@/config/metadata';

export const metadata = dashboardMetadata;

export default function BuyerDashboardPage() {
  return <DashboardOverview />;
}
