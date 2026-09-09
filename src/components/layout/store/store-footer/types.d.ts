import type { FC, SVGProps } from 'react';

/** One service feature in the white band at the top of the store footer. */
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
  /**
   * DOM id of the section the footer ribbon scrolls to. When omitted the
   * ribbon is not rendered at all (e.g. wholesale).
   */
  scrollTargetId?: string;
  /** Extra className for the feature band section (e.g. background color). */
  featureBandClassName?: string;
}
