export interface BestSellersSectionProps {
  /** View-all link — each storefront scopes its own destination. */
  link: { label: string; href: string };
  /** Section spacing/background — merged onto the section and its skeleton. */
  className?: string;
}
