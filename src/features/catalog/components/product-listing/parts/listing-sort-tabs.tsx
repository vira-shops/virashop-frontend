'use client';

import * as React from 'react';
import { Tabs, Typography } from '@/components/ui';
import { toFaDigits } from '@/utils/format';
import { CATALOG_SORT_OPTIONS } from '@/features/catalog/components/product-listing/constants';
import type { ProductSort } from '@/contracts/endpoints/products';

export interface ListingSortTabsProps {
  sort: ProductSort;
  total: number;
  onSortChange: (sort: ProductSort) => void;
}

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
      aria-label="مرتب سازی"
    />

    <Typography variant="body-sm" className="text-gray-300">
      {toFaDigits(total)} محصول
    </Typography>
  </div>
);

ListingSortTabs.displayName = 'ListingSortTabs';
