import * as React from 'react';
import Image from 'next/image';
import { Typography } from '@/components/ui';
import { cn } from '@/utils/ui';
import { formatToman, toFaDigits } from '@/utils/format';
import { CART_IMAGE_FALLBACK, CURRENCY_LABEL } from '@/features/cart/constants';
import type { CommissionProps, MoneyProps, ProductCellProps, StackedRowProps } from './types';

/** Amount at 16px with the unit trailing at 12px, as every money cell is drawn. */
export const Money: React.FC<MoneyProps> = ({ value, tone = 'default' }) => (
  <Typography
    variant="body-md"
    className={cn('text-center', tone === 'primary' ? 'text-primary' : 'text-primary-900')}
  >
    {formatToman(value)} <span className="text-caption-md font-light">{CURRENCY_LABEL}</span>
  </Typography>
);

export const Commission: React.FC<CommissionProps> = ({ percent, className }) => (
  <Typography variant="body-md" className={cn('text-primary-900', className)}>
    {toFaDigits(percent)}%
  </Typography>
);

export const ProductCell: React.FC<ProductCellProps> = ({ line }) => (
  <div className="flex items-center gap-3">
    <span className="rounded-4 relative size-13 shrink-0 overflow-hidden border border-gray-100 bg-white">
      <Image
        src={line.imageUrl ?? CART_IMAGE_FALLBACK}
        alt={line.name}
        fill
        sizes="48px"
        className="object-contain p-1"
      />
    </span>
    <Typography variant="body-sm" className="line-clamp-2 text-black">
      {line.name}
    </Typography>
  </div>
);

/** Phone layout: label on the start side, value on the end side. */
export const StackedRow: React.FC<StackedRowProps> = ({ label, children }) => (
  <div className="flex items-center justify-between gap-4">
    <Typography variant="body-sm" className="text-gray-700">
      {label}
    </Typography>
    {children}
  </div>
);
