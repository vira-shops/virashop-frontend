import type { DashboardNavItem } from './types';

/** Whether a nav item should light up for the current pathname. */
export const isNavItemActive = (item: DashboardNavItem, pathname: string | null): boolean => {
  if (!item.href || !pathname) return false;

  if (item.exact) return pathname === item.href;

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
};
