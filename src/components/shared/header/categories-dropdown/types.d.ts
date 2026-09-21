import type { Channel } from '@/validations/primitives';

export interface CategoriesDropdownProps {
  /** Storefront channel — category/product hrefs are built for this channel. */
  channel?: Channel;
  className?: string;
}
