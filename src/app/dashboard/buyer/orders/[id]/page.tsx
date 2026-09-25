import { OrderDetails } from '@/features/buyer-dashboard';
import { orderDetailsMetadata } from '@/config/metadata';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata = orderDetailsMetadata;

export default async function BuyerOrderDetailsPage({ params }: PageProps) {
  const { id } = await params;

  return <OrderDetails orderId={id} />;
}
