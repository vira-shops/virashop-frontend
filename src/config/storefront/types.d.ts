import type { ReactNode, FC, SVGProps } from 'react';
import type { Metadata } from 'next';
import type { Channel } from '@/validations/primitives';
import type { PATHS, StorefrontSegment } from '@/routes/paths';

// ---------------------------------------------------------------------------
// Store header — canonical shape. `components/shared/header/types.d.ts`
// re-exports these for its own local consumers; the object literals live in
// `retail.tsx` / `wholesale.tsx` in this folder.
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
  /** Name of an icon in the mobile sidebar's icon map (e.g. `'HeartIcon'`). */
  icon?: string;
  children?: NavItem[];
}

export interface UserAction {
  icon: ReactNode;
  ariaLabel: string;
  href?: string;
}

export interface StoreHeaderConfig {
  logo: { src: string; alt: string };
  /** Desktop secondary nav (after the categories mega menu). */
  navItems: NavItem[];
  /** Mobile sidebar nav — may differ from `navItems` (e.g. retail-only Favorites). */
  mobileNavItems: NavItem[];
  userActions: UserAction[];
  /** Storefront channel — carried into the auth wizard as `?channel=`. */
  channel?: Channel;
  /**
   * Fallback location shown in the header's city badge until the location
   * endpoint is wired — replace with backend data once available.
   */
  location?: { city: string };
}

// ---------------------------------------------------------------------------
// Store footer — canonical shape. `components/layout/store/store-footer/types.d.ts`
// re-exports these for its own local consumers.
// ---------------------------------------------------------------------------

export interface StoreFooterFeature {
  id: string;
  title: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
}

export interface StoreFooterLink {
  label: string;
  href: string;
}

/** One link column in the store footer body. */
export interface StoreFooterColumn {
  title: string;
  links: StoreFooterLink[];
}

export interface StoreFooterSocial {
  id: string;
  label: string;
  href: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
}

/** Contact column (پل های ارتباطی) — phone + social channels. */
export interface StoreFooterContact {
  title: string;
  phoneLabel: string;
  phone: string;
  phoneHref: string;
  socials: StoreFooterSocial[];
}

/**
 * Content of the store footer — the structural component is shared between
 * the retail and wholesale storefronts; only this config differs.
 * Placeholder `#` hrefs mark pages that do not exist yet.
 */
export interface StoreFooterConfig {
  features: StoreFooterFeature[];
  columns: StoreFooterColumn[];
  contact: StoreFooterContact;
  /** Extra className for the feature band section (e.g. background color). */
  featureBandClassName?: string;
}

// ---------------------------------------------------------------------------
// The channel registry entry itself.
// ---------------------------------------------------------------------------

export type StorefrontSegmentPaths = ReturnType<typeof PATHS.STORE>;

export interface StorefrontChannel {
  /** Contract/API value — what goes over the wire as `channel`. */
  channel: Channel;
  /** URL segment and `data-theme` value. */
  segment: StorefrontSegment;
  paths: StorefrontSegmentPaths;
  metadata: Metadata;
  header: StoreHeaderConfig;
  footer: StoreFooterConfig;
  /** Extra classes for the storefront <main> — wholesale uses `bg-blue-50`. */
  mainClassName?: string;
  /** Upper bound of the product-listing price filter. */
  priceMax: number;
}
