'use client';

import * as React from 'react';
import { Button } from '@/components/ui';
import { toFaDigits } from '@/utils/format';
import { GRAND_TOTAL_LABEL } from '@/features/cart/constants';
import { CHECKOUT_SUMMARY_COPY as COPY } from './constants';
import { SummaryAmount, SummaryRow } from './summary-row';
import type { CheckoutSummaryProps } from './types';

export type { CheckoutSummaryProps } from './types';

/** Money panel beside the wizard: what the order costs and what happens next. */
export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  totals,
  variant = 'full',
  action,
}) => (
  <div className="rounded-9 flex flex-col gap-4 bg-white p-5 shadow-sm">
    {variant === 'full' ? (
      <>
        <SummaryRow label={COPY.itemsTotal}>
          <SummaryAmount value={totals.itemsTotal} />
        </SummaryRow>
        <SummaryRow label={COPY.shipping}>
          <SummaryAmount value={totals.shipping === 0 ? null : totals.shipping} />
        </SummaryRow>
        <SummaryRow label={COPY.savings(toFaDigits(totals.savingsPercent))}>
          <SummaryAmount value={totals.savings} />
        </SummaryRow>

        <div className="border-t border-dashed border-gray-100" aria-hidden="true" />

        <SummaryRow label={GRAND_TOTAL_LABEL}>
          <SummaryAmount value={totals.grandTotal} highlight />
        </SummaryRow>
      </>
    ) : (
      <SummaryRow label={COPY.payable}>
        <SummaryAmount value={totals.grandTotal} highlight />
      </SummaryRow>
    )}

    {action && (
      <Button
        variant="fill"
        color="primary"
        size="md"
        fullWidth
        disabled={action.disabled}
        onClick={action.onClick}
      >
        {action.label}
      </Button>
    )}
  </div>
);

CheckoutSummary.displayName = 'CheckoutSummary';
