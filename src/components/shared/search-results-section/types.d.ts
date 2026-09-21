import type { Channel } from '@/validations';

export interface SearchResultsSectionProps {
  channel: Channel;
  query: string;
  hrefForProduct: (slug: string) => string;
  hrefForCategory: (slug: string) => string;
  className?: string;
}
