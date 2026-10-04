import { OrderDetails, getRouteChannel } from '@/features/buyer-dashboard';
import { orderDetailsMetadata } from '@/config/metadata';

interface PageProps {
  params: Promise<{ role: string; id: string }>;
}

export const metadata = orderDetailsMetadata;

export default async function BuyerOrderDetailsPage({ params }: PageProps) {
  const [channel, { id }] = await Promise.all([getRouteChannel({ params }), params]);

  return <OrderDetails channel={channel} orderId={id} />;
}
