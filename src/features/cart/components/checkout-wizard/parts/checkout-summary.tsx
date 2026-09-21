'use client';

import * as React from 'react';
import { Button, Typography } from '@/components/ui';
import { formatToman, toFaDigits } from '@/utils/format';
import { cn } from '@/utils/ui';
import {
  CURRENCY_LABEL,
  FREE_LABEL,
  GRAND_TOTAL_LABEL,
  ITEMS_TOTAL_LABEL,
  PAYABLE_LABEL,
  SAVINGS_LABEL,
  SHIPPING_LABEL,
} from '@/features/cart/constants';
import type { CartTotals } from '@/hooks';

export interface CheckoutSummaryProps {
  totals: CartTotals;
  /**
   * `full` is the four-row breakdown; `total` is the single «مبلغ کل» row the
   * payment step shows.
   */
  variant?: 'full' | 'total';
  action?: { label: string; onClick: () => void; disabled?: boolean };
}

const Row: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({
  label,
  children,
  className,
}) => (
  <div className={cn('flex items-center justify-between gap-4', className)}>
    <Typography variant="caption-md" className="text-gray-400">
      {label}
    </Typography>
    {children}
  </div>
);

/** Money panel beside the wizard: what the order costs and what happens next. */
export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  totals,
  variant = 'full',
  action,
}) => (
  <div className="rounded-9 flex flex-col gap-4 bg-white p-5 shadow-sm">
    {variant === 'full' ? (
      <>
        <Row label={ITEMS_TOTAL_LABEL}>
          <Typography variant="caption-md" className="text-gray-700">
            {formatToman(totals.itemsTotal)} {CURRENCY_LABEL}
          </Typography>
        </Row>

        <Row label={SHIPPING_LABEL}>
          <Typography variant="caption-md" className="text-gray-700">
            {totals.shipping === 0
              ? FREE_LABEL
              : `${formatToman(totals.shipping)} ${CURRENCY_LABEL}`}
          </Typography>
        </Row>

        <Row label={`${SAVINGS_LABEL} (${toFaDigits(totals.savingsPercent)}٪)`}>
          <Typography variant="caption-md" className="text-gray-700">
            {formatToman(totals.savings)} {CURRENCY_LABEL}
          </Typography>
        </Row>

        <div className="border-t border-dashed border-gray-100" aria-hidden="true" />

        <Row label={GRAND_TOTAL_LABEL}>
          <Typography variant="caption-md" className="text-primary font-bold">
            {formatToman(totals.grandTotal)} {CURRENCY_LABEL}
          </Typography>
        </Row>
      </>
    ) : (
      <Row label={PAYABLE_LABEL}>
        <Typography variant="caption-md" className="text-primary font-bold">
          {formatToman(totals.grandTotal)} {CURRENCY_LABEL}
        </Typography>
      </Row>
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
