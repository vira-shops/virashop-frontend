import type { ReactNode } from 'react';

export interface PartnerBrandsLogoColumnsProps {
  count: number;
  /** Renders the card for one absolute brand slot. */
  renderSlot: (slot: number) => ReactNode;
}
