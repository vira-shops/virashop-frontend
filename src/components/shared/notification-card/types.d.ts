export interface NotificationCardProps {
  title: string;
  body: string;
  /** ISO timestamp — rendered as a Jalali date. */
  date: string;
  /** Read items are muted. */
  read?: boolean;
  /** Uncontrolled initial state. */
  defaultExpanded?: boolean;
  /** Controlled open state — pair with `onExpandedChange`. */
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  titleClassName?: string;
  bodyClassName?: string;
}
