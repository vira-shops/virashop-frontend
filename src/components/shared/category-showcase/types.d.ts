import type { FC, SVGProps } from 'react';

/** One gradient icon-tile in the showcase. */
export interface CategoryShowcaseTile {
  /** Stable React key. */
  id: string;
  title: string;
  href?: string;
  /** Key looked up in the `iconMap` prop to pick the tile icon. */
  iconKey?: string;
}

export interface CategoryShowcaseProps {
  title: string;
  subtitle?: string;
  /** Tiles to render. With `soonLabel` the FIRST item is detached above the strip. */
  items: CategoryShowcaseTile[];
  /**
   * When set, the first item is rendered detached above a dashed strip
   * labeled with this text (e.g. «بزودی»). Omit to render every item in
   * the grid with no detached row.
   */
  soonLabel?: string;
  /** Maps `iconKey` → icon component. */
  iconMap?: Record<string, FC<SVGProps<SVGSVGElement>>>;
  /** Icon used when `iconMap[iconKey]` is missing or `iconKey` is unset. */
  fallbackIcon?: FC<SVGProps<SVGSVGElement>>;
  /** Renders the loading skeleton instead of tiles. */
  isLoading?: boolean;
  /** Number of skeleton tiles. @default 7 */
  skeletonCount?: number;
  /** DOM id — lets ribbons/buttons scroll to this section. */
  id?: string;
  className?: string;
  /** Extra classes for the tiles grid (merged over the default responsive grid). */
  gridClassName?: string;
}
