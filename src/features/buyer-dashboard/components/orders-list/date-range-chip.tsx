import * as React from 'react';
import { CancelIcon } from '@icons';
import { Badge, Button, formatIsoAsJalali } from '@/components/ui';
import { ORDERS_TOOLBAR } from './constants';
import type { DateRangeChipProps } from './types';

/** «بازه: از … تا …» — the active date filter, with a clear button. */
export const DateRangeChip: React.FC<DateRangeChipProps> = ({ from, to, onClear }) => (
  <div className="flex items-center gap-3">
    <Badge
      variant="outline"
      color="primary"
      size="md"
      leftIcon={
        <Button
          aria-label={ORDERS_TOOLBAR.clearFilters}
          onClick={onClear}
          icon={<CancelIcon className="size-7" aria-hidden="true" />}
        />
      }
    >
      {[
        ORDERS_TOOLBAR.rangePrefix,
        from && `${ORDERS_TOOLBAR.rangeFrom} ${formatIsoAsJalali(from)}`,
        to && `${ORDERS_TOOLBAR.rangeTo} ${formatIsoAsJalali(to)}`,
      ]
        .filter(Boolean)
        .join(' ')}
    </Badge>
  </div>
);
