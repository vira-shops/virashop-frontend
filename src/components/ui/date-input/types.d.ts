import type { TextInputProps } from '@/components/ui/text-input/types';

/**
 * Jalali date field — the value on the wire is a Gregorian `YYYY-MM-DD`
 * string, the field shows and picks Persian dates (`۱۴۰۰/۰۵/۲۱`).
 */
export interface DateInputProps extends Pick<
  TextInputProps,
  | 'variant'
  | 'color'
  | 'state'
  | 'size'
  | 'label'
  | 'inputMessage'
  | 'fullWidth'
  | 'disabled'
  | 'placeholder'
  | 'name'
  | 'id'
  | 'onBlur'
  | 'className'
  | 'wrapperClassName'
  | 'labelClassName'
  | 'fieldClassName'
  | 'messageClassName'
  | 'aria-label'
> {
  /** Gregorian `YYYY-MM-DD`; `null`/empty = no date. */
  value?: string | null;
  onChange?: (value: string | null) => void;
  /** Earliest pickable day, Gregorian `YYYY-MM-DD`. */
  minDate?: string;
  /** Latest pickable day, Gregorian `YYYY-MM-DD`. */
  maxDate?: string;
  /** Hides the calendar glyph. */
  hideIcon?: boolean;
  /** Extra class on the calendar popover. */
  calendarClassName?: string;
}
