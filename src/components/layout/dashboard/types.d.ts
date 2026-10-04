import type { ComponentType, ReactNode, SVGProps } from 'react';

export type DashboardTheme = 'wholesale' | 'retail';

export interface DashboardNavItem {
  key: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Filled variant shown while the tile is active; falls back to `icon`. */
  activeIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  href?: string;
  action?: 'logout';
  exact?: boolean;
}

/**
 * Everything that differs between the buyer / wholesale-seller /
 * retail-seller dashboards. Swap configs, not components.
 */
export interface DashboardConfig {
  theme: DashboardTheme;
  /** Page background behind the cards — e.g. `bg-blue-50`, `bg-retail-tint`. */
  surfaceClassName: string;
  subtitle: string;
  quickLinks: DashboardNavItem[];
  navItems: DashboardNavItem[];
}

export interface DashboardUser {
  name: string;
  avatarSrc?: string | null;
}

export interface DashboardShellProps {
  config: DashboardConfig;
  user: DashboardUser;
  onLogout?: () => void;
  loggingOut?: boolean;
  children?: ReactNode;
}

export interface DashboardMobileBarProps {
  config: DashboardConfig;
  user: DashboardUser;
  onLogout?: () => void;
  loggingOut?: boolean;
}
