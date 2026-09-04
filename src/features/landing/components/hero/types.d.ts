export interface HeroProps {
  defaultCity?: string;
  onCityChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  className?: string;
}
