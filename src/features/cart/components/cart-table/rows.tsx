import * as React from 'react';
import { Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import { lineTotal } from '@/hooks';
import { Commission, Money, ProductCell, StackedRow } from './cells';
import { CART_COLUMNS, HEAD_CELLS, ROW_GRID_CLASS } from './constants';
import { PrepaymentStepper, ShrinksStepper, UnitsStepper } from './line-steppers';
import type { CartLineRowProps } from './types';

/** Desktop header — shares the rows' grid so the columns line up. */
export const DesktopHeader: React.FC = () => (
  <div role="row" className={cn(ROW_GRID_CLASS, 'pb-4')}>
    <span />
    {HEAD_CELLS.map((label) => (
      <Typography
        key={label}
        variant="body-sm"
        className={cn(
          'text-center',
          label === CART_COLUMNS.total ? 'text-primary' : 'text-gray-700',
        )}
      >
        {label}
      </Typography>
    ))}
  </div>
);

/** Desktop: one grid row per line. */
export const DesktopRow: React.FC<CartLineRowProps> = (props) => (
  <div className={cn(ROW_GRID_CLASS, 'py-10')}>
    <ProductCell line={props.line} />
    <Money value={props.line.unitPrice} />
    <Commission percent={props.line.commissionPercent} className="text-center" />
    <ShrinksStepper {...props} />
    <UnitsStepper {...props} />
    <PrepaymentStepper {...props} />
    <Money value={lineTotal(props.line)} tone="primary" />
  </div>
);

/** Phones: the same data, stacked and labelled. */
export const MobileRow: React.FC<CartLineRowProps> = (props) => (
  <div className="flex flex-col gap-4 p-7">
    <ProductCell line={props.line} />
    <StackedRow label={CART_COLUMNS.unitPrice}>
      <Money value={props.line.unitPrice} />
    </StackedRow>
    <StackedRow label={CART_COLUMNS.commission}>
      <Commission percent={props.line.commissionPercent} />
    </StackedRow>
    <StackedRow label={CART_COLUMNS.shrinks}>
      <ShrinksStepper {...props} />
    </StackedRow>
    <StackedRow label={CART_COLUMNS.units}>
      <UnitsStepper {...props} />
    </StackedRow>
    <StackedRow label={CART_COLUMNS.prepayment}>
      <PrepaymentStepper {...props} />
    </StackedRow>
    <StackedRow label={CART_COLUMNS.total}>
      <Money value={lineTotal(props.line)} tone="primary" />
    </StackedRow>
  </div>
);
