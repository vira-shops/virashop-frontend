import {
  DashboardOverview,
  getRouteChannel,
  type BuyerRouteParams,
} from '@/features/buyer-dashboard';
import { dashboardMetadata } from '@/config/metadata';

export const metadata = dashboardMetadata;

export default async function BuyerDashboardPage(props: BuyerRouteParams) {
  return <DashboardOverview channel={await getRouteChannel(props)} />;
}
