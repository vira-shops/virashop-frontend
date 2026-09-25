import {
  BagIcon,
  ElementIcon,
  HeartIcon,
  LogoutIcon,
  MessageTextIcon,
  NotificationIcon,
  ShopStoreIcon,
  ShoppingCardGhostIcon,
  UserIcon,
} from '@icons';
import { PATHS } from '@/routes/paths';
import { DASHBOARD_NAV_LABELS, DASHBOARD_SUBTITLE } from './constants';
import type { DashboardConfig } from './types';

const BUYER = PATHS.DASHBOARD.BUYER;

/** Buyer dashboard — teal, like the design; shortcuts go to the retail storefront. */
export const buyerDashboardConfig: DashboardConfig = {
  theme: 'wholesale',
  subtitle: DASHBOARD_SUBTITLE,
  quickLinks: [
    {
      key: 'store',
      label: DASHBOARD_NAV_LABELS.store,
      icon: ShopStoreIcon,
      href: PATHS.RETAIL.ROOT,
    },
    {
      key: 'cart',
      label: DASHBOARD_NAV_LABELS.cart,
      icon: ShoppingCardGhostIcon,
      href: PATHS.CART_FOR('RETAIL'),
    },
  ],
  navItems: [
    {
      key: 'dashboard',
      label: DASHBOARD_NAV_LABELS.dashboard,
      icon: ElementIcon,
      href: BUYER.ROOT,
      exact: true,
    },
    { key: 'orders', label: DASHBOARD_NAV_LABELS.orders, icon: BagIcon, href: BUYER.ORDERS },
    {
      key: 'favorites',
      label: DASHBOARD_NAV_LABELS.favorites,
      icon: HeartIcon,
      href: BUYER.FAVORITES,
    },
    {
      key: 'notifications',
      label: DASHBOARD_NAV_LABELS.notifications,
      icon: NotificationIcon,
      href: BUYER.NOTIFICATIONS,
    },
    {
      key: 'reviews',
      label: DASHBOARD_NAV_LABELS.reviews,
      icon: MessageTextIcon,
      href: BUYER.REVIEWS,
    },
    { key: 'profile', label: DASHBOARD_NAV_LABELS.profile, icon: UserIcon, href: BUYER.PROFILE },
    { key: 'logout', label: DASHBOARD_NAV_LABELS.logout, icon: LogoutIcon, action: 'logout' },
  ],
};
