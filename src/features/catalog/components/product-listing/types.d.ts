import type { StorefrontChannel } from '@/config/storefront';

export interface ProductListingProps {
  channel: StorefrontChannel;
  categorySlug: string;
}
