'use client';

import * as React from 'react';
import { Typography } from '@/components/ui';
import { Modal, SortIcon } from '@/components/shared';
import { cn } from '@/utils/ui';
import { CATALOG_SORT_OPTIONS } from '@/features/catalog/components/product-listing/constants';
import type { ProductSort } from '@/contracts/endpoints/products';

export interface ListingSortSheetProps {
  open: boolean;
  sort: ProductSort;
  theme: string;
  onSelect: (sort: ProductSort) => void;
  onClose: () => void;
}

/** Mobile «مرتب سازی» bottom sheet — the same options as the desktop tab row. */
export const ListingSortSheet: React.FC<ListingSortSheetProps> = ({
  open,
  sort,
  theme,
  onSelect,
  onClose,
}) => (
  <Modal
    open={open}
    onClose={onClose}
    theme={theme}
    title="مرتب سازی"
    icon={<SortIcon className="size-8 text-black" />}
    size="sm"
    headerClassName="flex-row-reverse justify-end gap-3"
  >
    <fieldset className="flex flex-col">
      <legend className="sr-only">مرتب سازی</legend>
      {CATALOG_SORT_OPTIONS.map((option) => (
        <label
          key={option.value}
          className="flex cursor-pointer items-center justify-between gap-3 py-4"
        >
          <Typography
            variant="body-md"
            className={cn(sort === option.value ? 'text-primary' : 'text-gray-700')}
          >
            {option.label}
          </Typography>
          <input
            type="radio"
            name="catalog-sort"
            value={option.value}
            checked={sort === option.value}
            onChange={() => {
              onSelect(option.value);
              onClose();
            }}
            className="accent-primary size-7 ring-0"
          />
        </label>
      ))}
    </fieldset>
  </Modal>
);

ListingSortSheet.displayName = 'ListingSortSheet';
