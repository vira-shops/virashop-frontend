/** One selectable leaf (a child category, a brand, …). */
export interface ProductFilterOption {
  id: string | number;
  slug: string;
  label: string;
  productCount?: number;
}

/**
 * A collapsible group of options — the design nests child categories under a
 * parent row with its own "select everything here" checkbox. Pages with only
 * one level of category data pass a single group.
 */
export interface ProductFilterGroup {
  id: string | number;
  label: string;
  options: ProductFilterOption[];
  /** Label of the "whole group" row, e.g. «همه کالای اساسی». */
  allLabel?: string;
  /** Group starts expanded. @default false (first group opens by default) */
  defaultOpen?: boolean;
}

export interface ProductFilterPanelProps {
  priceMin: number;
  priceMax: number;
  priceValue: [number, number];
  formatPrice?: (value: number) => string;
  onPriceChange?: (value: [number, number]) => void;
  onPriceCommit?: (value: [number, number]) => void;

  /** Category tree. Omit to hide the whole «دسته بندی» section. */
  categoryGroups?: ProductFilterGroup[];
  selectedCategorySlugs?: string[];
  onCategoryToggle?: (slug: string) => void;
  /** Toggles every option in a group at once (the «همه …» row). */
  onCategoryGroupToggle?: (slugs: string[], selectAll: boolean) => void;

  /** Brand facet. Omit to hide the «برند» section (no brands endpoint yet). */
  brands?: ProductFilterOption[];
  selectedBrandSlugs?: string[];
  onBrandToggle?: (slug: string) => void;

  /** «کالای موجود» — omit `onInStockChange` to hide the row. */
  inStock?: boolean;
  onInStockChange?: (value: boolean) => void;

  onClear?: () => void;
  className?: string;
}
