import type { ReactNode } from 'react';
import type { CardSectionItem } from '@/components/shared/card-section/types';

export interface CampaignBannerViewAll {
  label?: string;
  href?: string;
  onClick?: () => void;
}

/** One card in the campaign row — `ProductCardProps` plus an optional `id` (React key). */
export type CampaignBannerItem = CardSectionItem;

export interface CampaignBannerProps {
  title: ReactNode;
  subtitle?: ReactNode;
  /**
   * Discount deadline — the countdown counts down to this moment. Accepts
   * anything `new Date()` understands (ISO string, timestamp, Date).
   */
  endsAt: string | number | Date;
  /** Product cards for the horizontal, scrollable row. */
  items: CampaignBannerItem[];
  /** "View all" action under the countdown. */
  viewAll?: CampaignBannerViewAll;
  /** DOM id — lets the hero ribbon scroll to this section. */
  id?: string;
  className?: string;
}
