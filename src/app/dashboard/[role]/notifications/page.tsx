import { NotificationsList } from '@/features/buyer-dashboard';
import { notificationsMetadata } from '@/config/metadata';

export const metadata = notificationsMetadata;

export default function BuyerNotificationsPage() {
  return <NotificationsList />;
}
