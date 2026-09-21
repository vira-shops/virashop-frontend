import type { StorefrontChannel } from '@/config/storefront';

export interface ProductDetailsProps {
  channel: StorefrontChannel;
  slug: string;
}
