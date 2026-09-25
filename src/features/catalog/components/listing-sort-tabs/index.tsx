'use client';

import * as React from 'react';
import { Tabs, Typography } from '@/components/ui';
import type { ProductSort } from '@/contracts/endpoints/products';
import { toFaDigits } from '@/utils/format';
import { CATALOG_SORT_OPTIONS, SORT_LABEL, resultCountLabel } from './constants';
import type { ListingSortTabsProps } from './types';

export type { ListingSortTabsProps } from './types';

/** Desktop sort row — underline tabs on the start side, the result count on the end side. */
export const ListingSortTabs: React.FC<ListingSortTabsProps> = ({ sort, total, onSortChange }) => (
  <div className="hidden items-center justify-between md:flex">
    <Tabs
      variant="underline"
      color="primary"
      size="md"
      items={CATALOG_SORT_OPTIONS.map((option) => ({ value: option.value, label: option.label }))}
      value={sort}
      onChange={(value) => onSortChange(value as ProductSort)}
      aria-label={SORT_LABEL}
    />

    <Typography variant="body-sm" className="text-gray-300">
      {resultCountLabel(toFaDigits(total))}
    </Typography>
  </div>
);

ListingSortTabs.displayName = 'ListingSortTabs';
