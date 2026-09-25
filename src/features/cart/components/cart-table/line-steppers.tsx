import * as React from 'react';
import { Stepper } from '@/components/ui';
import { formatToman, toFaDigits } from '@/utils/format';
import { CURRENCY_LABEL } from '@/features/cart/constants';
import { PREPAYMENT_STEP, STEPPER_CLASS, STEPPER_LABELS } from './constants';
import type { CartLineRowProps } from './types';

/*
 * The three quantity steppers of a line — shared by the desktop grid and the
 * stacked phone layout so both stay identical.
 */

export const ShrinksStepper: React.FC<CartLineRowProps> = ({ line, onShrinksChange }) => (
  <Stepper
    size="sm"
    value={line.shrinks}
    min={0}
    onChange={(value) => onShrinksChange(line.id, value)}
    formatValue={toFaDigits}
    aria-label={STEPPER_LABELS.shrinks(line.name)}
    className={STEPPER_CLASS}
  />
);

export const UnitsStepper: React.FC<CartLineRowProps> = ({ line, onUnitsChange }) => (
  <Stepper
    size="sm"
    value={line.units}
    min={0}
    onChange={(value) => onUnitsChange(line.id, value)}
    formatValue={toFaDigits}
    aria-label={STEPPER_LABELS.units(line.name)}
    className={STEPPER_CLASS}
  />
);

export const PrepaymentStepper: React.FC<CartLineRowProps> = ({ line, onPrepaymentChange }) => (
  <Stepper
    size="sm"
    value={line.prepayment}
    min={0}
    step={PREPAYMENT_STEP}
    unit={CURRENCY_LABEL}
    onChange={(value) => onPrepaymentChange(line.id, value)}
    formatValue={formatToman}
    aria-label={STEPPER_LABELS.prepayment(line.name)}
    className={STEPPER_CLASS}
  />
);
