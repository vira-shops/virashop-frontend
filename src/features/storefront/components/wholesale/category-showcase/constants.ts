import { BottleIcon, CackeIcon, CheeseIcon, FishIcon, LeafIcon } from '@icons';
import type { CategoryIconMap } from './types';

export const WHOLESALE_CATEGORIES_SECTION_ID = 'wholesale-categories';
export const WHOLESALE_CATEGORIES_TITLE = 'دستـــــــــــه بندی ها';
export const WHOLESALE_CATEGORIES_SUBTITLE = 'بیش از 5,000 محصول';
export const WHOLESALE_CATEGORIES_SOON_LABEL = 'بزودی';

/** Tiles shown in the showcase grid. */
export const WHOLESALE_CATEGORIES_LIMIT = 8;

export const CATEGORY_ICONS: CategoryIconMap = {
  food: BottleIcon,
  protein: FishIcon,
  dairy: CackeIcon,
  snacks: CheeseIcon,
  beverages: BottleIcon,
  detergents: LeafIcon,
  fruits: LeafIcon,
  sweets: CackeIcon,
};

export const CATEGORY_FALLBACK_ICON = BottleIcon;
