import type { FeedbackProduct } from '@/components/shared';
import type { ReviewProduct } from '@/contracts/endpoints/reviews';
import { PATHS } from '@/routes/paths';

export const toFeedbackProduct = (product: ReviewProduct): FeedbackProduct => ({
  name: product.name,
  image: product.image,
  href:
    product.channel === 'WHOLESALE'
      ? PATHS.WHOLESALE.PRODUCT(product.slug)
      : PATHS.RETAIL.PRODUCT(product.slug),
});
