export type ValueSliderColor = 'primary' | 'blue';

export interface ValueSliderProps {
  min: number;
  max: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  /** Fires on every drag frame. */
  onValueChange?: (value: number) => void;
  /** Fires once on release/blur — use this to trigger a fetch/URL update. */
  onValueCommit?: (value: number) => void;
  /**
   * Formats the bubble and the min/max end labels — the caller owns the unit
   * («۴۵ روز», «۳ شل»), so this component stays content-agnostic.
   */
  formatLabel?: (value: number) => string;
  /** Accessible name; required because the visible label is the bubble. */
  'aria-label': string;
  disabled?: boolean;
  color?: ValueSliderColor;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  trackClassName?: string;
  rangeClassName?: string;
  bubbleClassName?: string;
  labelsClassName?: string;
}
