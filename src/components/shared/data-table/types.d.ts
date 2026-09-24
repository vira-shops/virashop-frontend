import type { ReactNode } from 'react';
import type { TableAlign, TableVariant } from '@/components/ui';

export interface DataTableColumn<TRow> {
  key: string;
  header: ReactNode;
  render: (row: TRow) => ReactNode;
  /** @default 'start' */
  align?: TableAlign;
  /**
   * Classes for this column's body cells. The caller owns breakpoints —
   * hide a column on phones with `max-md:hidden` here AND in `headerClassName`.
   */
  cellClassName?: string;
  headerClassName?: string;
}

export interface DataTableProps<TRow> {
  columns: DataTableColumn<TRow>[];
  rows: TRow[];
  getRowKey: (row: TRow) => string | number;
  /** Makes each row navigate here and adds a trailing chevron link. */
  getRowHref?: (row: TRow) => string;
  /** Accessible name for the chevron link. @default 'مشاهده جزئیات' */
  rowLinkLabel?: string;
  /** @default 'striped' */
  variant?: TableVariant;
  /** Hides the header row (the phone layouts keep only the body). */
  hideHeader?: boolean;
  loading?: boolean;
  /** Placeholder rows while loading. @default 3 */
  skeletonRows?: number;
  /** Rendered instead of the table when there are no rows. */
  emptyState?: ReactNode;
  'aria-label'?: string;
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  tableClassName?: string;
  rowClassName?: string;
}
