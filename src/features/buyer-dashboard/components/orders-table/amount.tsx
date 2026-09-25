import * as React from 'react';
import { cn } from '@/utils/ui';
import { formatToman } from '@/utils/format';
import { CURRENCY_LABEL } from '@/features/buyer-dashboard/constants';
import type { AmountProps } from './types';

/** «۲٬۵۴۰٬۰۰۰ تومان» — the amount, with the unit small and muted after it. */
export const Amount: React.FC<AmountProps> = ({ value, className }) => (
  <span className={cn('inline-flex items-baseline gap-1 whitespace-nowrap', className)}>
    <span className="font-medium">{formatToman(value)}</span>
    <span className="text-caption-md text-blue-300">{CURRENCY_LABEL}</span>
  </span>
);
