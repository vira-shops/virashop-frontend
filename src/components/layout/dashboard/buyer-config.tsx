import {
  BagBoldIcon,
  BagIcon,
  BellBoldIcon,
  BellIcon,
  Element3Icon,
  ElementIcon,
  HeartBoldIcon,
  HeartIcon,
  LocationBoldIcon,
  LogoutIcon,
  MapPinIcon,
  MessageTextBoldIcon,
  MessageTextIcon,
  ShopStoreIcon,
  ShoppingCardGhostIcon,
  UserBoldIcon,
  UserIcon,
} from '@icons';
import { PATHS } from '@/routes/paths';
import type { Channel } from '@/validations/primitives';
import { DASHBOARD_NAV_LABELS as L, DASHBOARD_SUBTITLE } from './constants';
import type { DashboardConfig } from './types';

/** Per-channel dashboard routes, palette and page surface. */
const CHANNEL = {
  WHOLESALE: {
    paths: PATHS.DASHBOARD.WHOLESALE_BUYER,
    store: PATHS.WHOLESALE.ROOT,
    theme: 'wholesale',
    surfaceClassName: 'bg-blue-50',
  },
  RETAIL: {
    paths: PATHS.DASHBOARD.RETAIL_BUYER,
    store: PATHS.RETAIL.ROOT,
    theme: 'retail',
    surfaceClassName: 'bg-retail-tint',
  },
} as const;

/**
 * Buyer dashboard menu for one storefront channel. Both buyer dashboards
 * share the same sections; only the routes, palette and shortcuts differ.
 */
export const createBuyerDashboardConfig = (channel: Channel): DashboardConfig => {
  const { paths, store, theme, surfaceClassName } = CHANNEL[channel];

  return {
    theme,
    surfaceClassName,
    subtitle: DASHBOARD_SUBTITLE,
    quickLinks: [
      { key: 'store', label: L.store, icon: ShopStoreIcon, href: store },
      { key: 'cart', label: L.cart, icon: ShoppingCardGhostIcon, href: PATHS.CART_FOR(channel) },
    ],
    navItems: [
      {
        key: 'dashboard',
        label: L.dashboard,
        icon: Element3Icon,
        activeIcon: ElementIcon,
        href: paths.ROOT,
        exact: true,
      },
      {
        key: 'orders',
        label: L.orders,
        icon: BagIcon,
        activeIcon: BagBoldIcon,
        href: paths.ORDERS,
      },
      {
        key: 'favorites',
        label: L.favorites,
        icon: HeartIcon,
        activeIcon: HeartBoldIcon,
        href: paths.FAVORITES,
      },
      {
        key: 'notifications',
        label: L.notifications,
        icon: BellIcon,
        activeIcon: BellBoldIcon,
        href: paths.NOTIFICATIONS,
      },
      {
        key: 'reviews',
        label: L.reviews,
        icon: MessageTextIcon,
        activeIcon: MessageTextBoldIcon,
        href: paths.REVIEWS,
      },
      {
        key: 'profile',
        label: L.profile,
        icon: UserIcon,
        activeIcon: UserBoldIcon,
        href: paths.PROFILE,
      },
      {
        key: 'addresses',
        label: L.addresses,
        icon: MapPinIcon,
        activeIcon: LocationBoldIcon,
        href: paths.ADDRESSES,
      },
      { key: 'logout', label: L.logout, icon: LogoutIcon, action: 'logout' },
    ],
  };
};

export const wholesaleBuyerDashboardConfig = createBuyerDashboardConfig('WHOLESALE');
export const retailBuyerDashboardConfig = createBuyerDashboardConfig('RETAIL');
