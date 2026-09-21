import type { Channel } from '@/validations/primitives';

export interface CheckoutWizardProps {
  /**
   * Plain channel value, not the full StorefrontChannel — a Server Component
   * page cannot pass the config across the server→client boundary (its
   * header/footer embed icon components and `paths` embeds functions).
   * Resolved internally.
   */
  channel: Channel;
}
