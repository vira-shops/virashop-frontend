export interface HeroProps {
  defaultCity?: string;
  onCityChange?: (value: string) => void;
  /** @default 'برای جست و جو بهتر مکان خود را ثبت کنید' */
  searchPlaceholder?: string;
  className?: string;
}
