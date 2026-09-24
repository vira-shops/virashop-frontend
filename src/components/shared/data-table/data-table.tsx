'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon } from '@icons';
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/components/ui';
import { cn } from '@/utils/ui';
import type { DataTableProps } from './types';

/**
 * Column-configured table on top of the `Table` primitive. With
 * `getRowHref` the whole row is clickable (mouse) while a real chevron
 * `<Link>` in the last cell keeps it keyboard- and screen-reader-reachable.
 */
export function DataTable<TRow>({
  columns,
  rows,
  getRowKey,
  getRowHref,
  rowLinkLabel = 'مشاهده جزئیات',
  variant = 'striped',
  hideHeader = false,
  loading = false,
  skeletonRows = 3,
  emptyState,
  'aria-label': ariaLabel,
  className,
  tableClassName,
  rowClassName,
}: DataTableProps<TRow>) {
  const router = useRouter();
  const linkColumn = Boolean(getRowHref);

  if (!loading && rows.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className={cn('w-full', className)}>
      <Table
        variant={variant}
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        className={tableClassName}
      >
        {!hideHeader && (
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableHeaderCell
                  key={column.key}
                  align={column.align}
                  className={column.headerClassName}
                >
                  {column.header}
                </TableHeaderCell>
              ))}
              {linkColumn && (
                <TableHeaderCell className="w-0">
                  <span className="sr-only">{rowLinkLabel}</span>
                </TableHeaderCell>
              )}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {loading
            ? Array.from({ length: skeletonRows }, (_, index) => (
                <TableRow key={`skeleton-${index}`} className={rowClassName}>
                  {columns.map((column) => (
                    <TableCell key={column.key} className={column.cellClassName}>
                      <Skeleton className="rounded-3 h-7 w-full max-w-24" />
                    </TableCell>
                  ))}
                  {linkColumn && <TableCell />}
                </TableRow>
              ))
            : rows.map((row) => {
                const href = getRowHref?.(row);

                return (
                  <TableRow
                    key={getRowKey(row)}
                    className={rowClassName}
                    onClick={href ? () => router.push(href) : undefined}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        align={column.align}
                        className={column.cellClassName}
                      >
                        {column.render(row)}
                      </TableCell>
                    ))}
                    {href && (
                      <TableCell align="end" className="w-0">
                        <Link
                          href={href}
                          aria-label={rowLinkLabel}
                          // The row already navigates — stop the click from firing twice.
                          onClick={(event) => event.stopPropagation()}
                          className="hover:text-primary inline-flex text-blue-300 transition-colors"
                        >
                          <ChevronLeftIcon className="size-9" aria-hidden="true" />
                        </Link>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </div>
  );
}

DataTable.displayName = 'DataTable';
