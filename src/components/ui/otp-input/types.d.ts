import type { Ref } from 'react';

export type OtpInputSize = 'sm' | 'md' | 'lg';

export type OtpInputState = 'error' | 'success';

export interface OtpInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Fires once when the last cell is filled. */
  onComplete?: (value: string) => void;
  /** Number of digit cells — the API expects exactly 6. */
  length?: number;
  size?: OtpInputSize;
  state?: OtpInputState;
  disabled?: boolean;
  autoFocus?: boolean;
  /** Accessible name for the group; cells are labelled `"<name> — رقم n"`. */
  label?: string;
  message?: string;
  dir?: 'rtl' | 'ltr' | 'auto';
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  cellClassName?: string;
  messageClassName?: string;
  /** Ref lands on the first cell input (focus control). */
  ref?: Ref<HTMLInputElement>;
}
