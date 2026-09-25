import * as React from 'react';
import { cn } from '@/utils/ui';
import {
  TableAlign,
  TableCellProps,
  TableHeaderCellProps,
  TableProps,
  TableRowProps,
  TableSectionProps,
  TableVariant,
} from './types';

const variantClasses: Record<TableVariant, string> = {
  striped: 'table-striped',
  divided: 'table-divided',
};

const alignClasses: Record<TableAlign, string> = {
  start: 'table-align-start',
  center: 'table-align-center',
  end: 'table-align-end',
};

export const Table: React.FC<TableProps> = ({
  variant = 'striped',
  className,
  wrapperClassName,
  children,
  ...rest
}) => (
  <div data-slot="table-wrapper" className={cn('table-wrapper', wrapperClassName)}>
    <table data-slot="table" className={cn('table', variantClasses[variant], className)} {...rest}>
      {children}
    </table>
  </div>
);

export const TableHead: React.FC<TableSectionProps> = (props) => <thead {...props} />;

export const TableBody: React.FC<TableSectionProps> = (props) => <tbody {...props} />;

export const TableRow: React.FC<TableRowProps> = ({ className, onClick, ...rest }) => (
  <tr className={cn(onClick && 'table-row-interactive', className)} onClick={onClick} {...rest} />
);

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  align = 'start',
  className,
  scope = 'col',
  ...rest
}) => (
  <th scope={scope} className={cn('table-header-cell', alignClasses[align], className)} {...rest} />
);

export const TableCell: React.FC<TableCellProps> = ({ align = 'start', className, ...rest }) => (
  <td className={cn('table-cell', alignClasses[align], className)} {...rest} />
);

Table.displayName = 'Table';
TableHead.displayName = 'TableHead';
TableBody.displayName = 'TableBody';
TableRow.displayName = 'TableRow';
TableHeaderCell.displayName = 'TableHeaderCell';
TableCell.displayName = 'TableCell';
