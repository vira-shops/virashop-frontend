import type { Channel } from '@/validations/primitives';

export interface ProductListingProps {
  /**
   * Plain channel value, not the full StorefrontChannel — a Server
   * Component page can't pass the full config as a prop (its `header`/
   * `footer` embed icon components and `paths` embeds functions, neither
   * serializable across the server→client boundary). Resolved internally.
   */
  channel: Channel;
  categorySlug: string;
}
