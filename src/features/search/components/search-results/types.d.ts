import type { StorefrontChannel } from '@/config/storefront';

export interface SearchResultsProps {
  channel: StorefrontChannel;
  query: string;
}
