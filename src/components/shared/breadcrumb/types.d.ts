export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  itemClassName?: string;
  separatorClassName?: string;
  linkClassName?: string;
  activeClassName?: string;
}
