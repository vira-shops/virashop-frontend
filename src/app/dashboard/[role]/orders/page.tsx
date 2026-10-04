import { Suspense } from 'react';
import { OrdersList, getRouteChannel, type BuyerRouteParams } from '@/features/buyer-dashboard';
import { ordersMetadata } from '@/config/metadata';

export const metadata = ordersMetadata;

export default async function BuyerOrdersPage(props: BuyerRouteParams) {
  const channel = await getRouteChannel(props);

  // The list keeps its filters in the URL (`useSearchParams`).
  return (
    <Suspense fallback={null}>
      <OrdersList channel={channel} />
    </Suspense>
  );
}
