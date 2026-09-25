export interface DateRange {
  /** Gregorian `YYYY-MM-DD`, or `null` for an open start. */
  from: string | null;
  /** Gregorian `YYYY-MM-DD`, or `null` for an open end. */
  to: string | null;
}

export interface DateRangeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (range: DateRange) => void;
  /** Pre-fills the fields every time the modal opens. */
  initialRange?: DateRange;
  /** @default 'جستجو تاریخ' */
  title?: string;
  /** @default 'شروع و پایان تاریخ را انتخاب کنید' */
  description?: string;
  /** @default 'جستجو' */
  submitLabel?: string;
  /** Extra class on the modal panel. */
  className?: string;
  /** Classes on the from/to fields grid — the caller owns breakpoints (e.g. `md:grid-cols-2`). */
  fieldsClassName?: string;
}
