import { BottleIcon, CackeIcon, CheeseIcon, FishIcon, LeafIcon } from '@icons';
import { FC, SVGProps } from 'react';

export const CATEGORY_ICONS: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  food: BottleIcon,
  protein: FishIcon,
  dairy: CackeIcon,
  snacks: CheeseIcon,
  beverages: BottleIcon,
  detergents: LeafIcon,
  fruits: LeafIcon,
  sweets: CackeIcon,
};
