import { ReviewsList } from '@/features/buyer-dashboard';
import { reviewsMetadata } from '@/config/metadata';

export const metadata = reviewsMetadata;

export default function BuyerReviewsPage() {
  return <ReviewsList />;
}
