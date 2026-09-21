import type { WholesaleInfo } from '@/contracts/endpoints/products';

export interface ProductPriceBlockProps {
  price: number;
  compareAtPrice?: number | null;
  discountPercent?: number;
  /** Present only for the wholesale channel — switches the block to the tiered-pricing layout. */
  wholesale?: WholesaleInfo | null;
  formatPrice?: (value: number) => string;
  className?: string;
}
