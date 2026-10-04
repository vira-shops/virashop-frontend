'use client';

import * as React from 'react';
import { useCountdown, toFaDigits } from '@/components/shared';
import { FAVORITE_COPY } from './constants';
import type { SaleCountdownProps } from './types';

/** «۲۴ : ۵۳ : ۱۷» — hours (days folded in) : minutes : seconds until the sale ends. */
export const SaleCountdown: React.FC<SaleCountdownProps> = ({ endsAt }) => {
  const { days, hours, minutes, seconds, ended } = useCountdown(endsAt);

  if (ended) return null;

  return (
    <time
      dateTime={endsAt}
      aria-label={FAVORITE_COPY.countdownLabel}
      className="text-caption-md text-primary tabular-nums"
    >
      {[days * 24 + hours, minutes, seconds].map(toFaDigits).join(' : ')}
    </time>
  );
};
