import type { Channel } from '@/validations';

export interface ProductDetailsSectionProps {
  channel: Channel;
  slug: string;
  hrefForProduct: (slug: string) => string;
  hrefForCategory: (slug: string) => string;
  className?: string;
}
