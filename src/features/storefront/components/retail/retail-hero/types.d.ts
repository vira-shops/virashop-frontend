export interface RetailHeroProps {
  /**
   * Slug of the category being browsed. Omit on the storefront landing; pass
   * one and the hero becomes that category's landing — its name in the
   * heading, its children as the tiles.
   */
  categorySlug?: string;
}
