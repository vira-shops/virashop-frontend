import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from './table';
import type { TableVariant } from './types';

const renderTable = (variant?: TableVariant, onRowClick?: () => void) =>
  render(
    <Table variant={variant} aria-label="سفارشات">
      <TableHead>
        <TableRow>
          <TableHeaderCell>کد پیگیری</TableHeaderCell>
          <TableHeaderCell align="end">مبلغ</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow onClick={onRowClick}>
          <TableCell>۱۲۳۴</TableCell>
          <TableCell align="center">۲۵۰۰</TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  );

describe('Table', () => {
  it('renders a semantic table with column headers', () => {
    renderTable();

    expect(screen.getByRole('table', { name: 'سفارشات' })).toHaveClass('table', 'table-striped');
    expect(screen.getAllByRole('columnheader')).toHaveLength(2);
    expect(screen.getByRole('columnheader', { name: 'کد پیگیری' })).toHaveAttribute('scope', 'col');
  });

  it.each([
    ['striped', 'table-striped'],
    ['divided', 'table-divided'],
  ] as const)('applies the %s variant', (variant, expected) => {
    renderTable(variant);

    expect(screen.getByRole('table')).toHaveClass(expected);
  });

  it('aligns cells through static classes', () => {
    renderTable();

    expect(screen.getByRole('columnheader', { name: 'مبلغ' })).toHaveClass('table-align-end');
    expect(screen.getByRole('cell', { name: '۲۵۰۰' })).toHaveClass('table-align-center');
    expect(screen.getByRole('cell', { name: '۱۲۳۴' })).toHaveClass('table-align-start');
  });

  it('marks clickable rows as interactive and fires the handler', () => {
    const onClick = jest.fn();
    renderTable('striped', onClick);

    const row = screen.getByRole('cell', { name: '۱۲۳۴' }).closest('tr')!;

    expect(row).toHaveClass('table-row-interactive');
    fireEvent.click(row);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('leaves plain rows non-interactive', () => {
    renderTable();

    const row = screen.getByRole('cell', { name: '۱۲۳۴' }).closest('tr')!;

    expect(row).not.toHaveClass('table-row-interactive');
  });
});
