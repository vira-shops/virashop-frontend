export type RangeSliderColor = 'primary' | 'blue';

export type RangeSliderValue = [number, number];

export interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value?: RangeSliderValue;
  defaultValue?: RangeSliderValue;
  /** Fires on every drag frame. */
  onValueChange?: (value: RangeSliderValue) => void;
  /** Fires once on release/blur — use this to trigger a fetch/URL update. */
  onValueCommit?: (value: RangeSliderValue) => void;
  /** Formats the min/max labels — caller owns currency/locale formatting. */
  formatLabel?: (value: number) => string;
  disabled?: boolean;
  color?: RangeSliderColor;
  className?: string;
  trackClassName?: string;
  rangeClassName?: string;
  thumbInputClassName?: string;
  labelsClassName?: string;
}
