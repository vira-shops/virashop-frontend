export interface ProductFilterCategoryItem {
  id: string | number;
  slug: string;
  label: string;
  productCount?: number;
}

export interface ProductFilterPanelProps {
  priceMin: number;
  priceMax: number;
  priceValue: [number, number];
  formatPrice?: (value: number) => string;
  onPriceChange?: (value: [number, number]) => void;
  onPriceCommit?: (value: [number, number]) => void;
  categories: ProductFilterCategoryItem[];
  activeCategorySlug?: string;
  onCategorySelect?: (slug: string) => void;
  onClear?: () => void;
  className?: string;
  categoryListClassName?: string;
}
