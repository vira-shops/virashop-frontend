import { ReactNode } from 'react';
import type { ButtonColor } from '@/components/ui';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface HeaderCTA {
  label: string;
  href: string;
  color?: ButtonColor;
}

export interface UserAction {
  icon: ReactNode;
  ariaLabel: string;
  href?: string;
}

export interface StoreHeaderConfig {
  logo: { src: string; alt: string };
  brandName: string;
  navItems: NavItem[];
  userActions: UserAction[];
  /** Storefront channel — carried into the auth wizard as `?channel=`. */
  channel?: 'RETAIL' | 'WHOLESALE';
  /**
   * Fallback location shown in the header's city badge until the location
   * endpoint is wired — replace with backend data once available.
   */
  location?: { city: string };
}
