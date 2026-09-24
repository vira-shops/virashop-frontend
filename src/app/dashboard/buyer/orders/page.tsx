import { Suspense } from 'react';
import { OrdersList } from '@/features/buyer-dashboard';
import { ordersMetadata } from '@/config/metadata';

export const metadata = ordersMetadata;

export default function BuyerOrdersPage() {
  // The list keeps its filters in the URL (`useSearchParams`).
  return (
    <Suspense fallback={null}>
      <OrdersList />
    </Suspense>
  );
}
