export interface HeroSearchBarProps {
  placeholder?: string;
  /** Provide both this and `hrefForSearch` to enable the suggestions dropdown. */
  hrefForCategory?: (slug: string) => string;
  /** Builds the href for a free-text search (typed term, recent chip, or Enter). */
  hrefForSearch?: (query: string) => string;
  className?: string;
}
