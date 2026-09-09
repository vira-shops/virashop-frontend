export interface HeroProps {
  defaultCity?: string;
  onCityChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  /** @default true — storefronts (wholesale/retail) hide the city select. */
  showCitySelect?: boolean;
  /** @default true — hide the storefront showcase under the stories. */
  showStorefront?: boolean;
  /** @default 'برای جست و جو بهتر مکان خود را ثبت کنید' */
  searchPlaceholder?: string;
  className?: string;
}
