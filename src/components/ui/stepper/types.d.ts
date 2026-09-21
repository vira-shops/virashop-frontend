export type StepperSize = 'sm' | 'md';

export interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /**
   * Rendered after the number, e.g. «شل» / «عدد». The caller owns the unit so
   * the component stays content-agnostic.
   */
  unit?: string;
  /** Formats the number itself — pass `toFaDigits` for Persian digits. */
  formatValue?: (value: number) => string;
  /** Accessible name for the whole control. */
  'aria-label': string;
  size?: StepperSize;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  valueClassName?: string;
  buttonClassName?: string;
}
