export interface LandingBottomBarItem {
  id: string;
  label: string;
  /** Destination. Omit while the target is still being decided — the chip
   *  then renders as a plain button that reports its own id on press. */
  href?: string;
}

export interface LandingBottomBarProps {
  items: LandingBottomBarItem[];
  /** Accessible name for the centre action. @default 'دسته‌بندی‌های بیشتر' */
  actionLabel?: string;
  /** Destination for the centre action; falls back to `onAction`. */
  actionHref?: string;
  onAction?: () => void;
  /** Fired when a chip without an `href` is pressed. */
  onItemSelect?: (item: LandingBottomBarItem) => void;
  className?: string;
}
