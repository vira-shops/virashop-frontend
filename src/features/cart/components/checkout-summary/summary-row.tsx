import * as React from 'react';
import { Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import { formatToman } from '@/utils/format';
import { CURRENCY_LABEL } from '@/features/cart/constants';
import { CHECKOUT_SUMMARY_COPY as COPY } from './constants';
import type { SummaryAmountProps, SummaryRowProps } from './types';

export const SummaryRow: React.FC<SummaryRowProps> = ({ label, children, className }) => (
  <div className={cn('flex items-center justify-between gap-4', className)}>
    <Typography variant="caption-md" className="text-gray-400">
      {label}
    </Typography>
    {children}
  </div>
);

export const SummaryAmount: React.FC<SummaryAmountProps> = ({ value, highlight = false }) => (
  <Typography variant="caption-md" className={highlight ? 'text-primary' : 'text-gray-700'}>
    {value === null ? COPY.free : `${formatToman(value)} ${CURRENCY_LABEL}`}
  </Typography>
);
