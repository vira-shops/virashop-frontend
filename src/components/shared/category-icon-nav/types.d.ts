export interface CategoryIconNavItem {
  id: string | number;
  title: string;
  image: string;
  imageAlt?: string;
  href?: string;
}

export interface CategoryIconNavProps {
  items: CategoryIconNavItem[];
  activeId?: string | number;
  className?: string;
  itemClassName?: string;
  /** Merged onto the active item's CategoryCard (default: primary ring). */
  activeItemClassName?: string;
}
