import type { Channel } from '@/validations';

export interface ProductListingSectionProps {
  channel: Channel;
  categorySlug: string;
  hrefForProduct: (slug: string) => string;
  hrefForCategory: (slug: string) => string;
  /** Static configured price-slider bounds (no facets/price-bounds endpoint exists yet). */
  priceMin?: number;
  priceMax?: number;
  className?: string;
}
