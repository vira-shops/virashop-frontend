'use client';

import * as React from 'react';
import { Radio, Typography } from '@/components/ui';
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
        <Radio
          key={option.value}
          name="catalog-sort"
          value={option.value}
          checked={sort === option.value}
          onChange={() => {
            onSelect(option.value);
            onClose();
          }}
          /*
            The label carries its own Typography rather than utilities on
            `labelClassName`: twMerge reads `text-body-md` and `text-primary`
            as one `text-*` group and would drop the size.
          */
          label={
            <Typography
              variant="body-md"
              className={cn(sort === option.value ? 'text-primary' : 'text-gray-700')}
            >
              {option.label}
            </Typography>
          }
          // `flex-row-reverse` puts the control on the left of an RTL row and
          // the label on the right, per the sheet mock.
          className="w-full flex-row-reverse justify-between py-4"
        />
      ))}
    </fieldset>
  </Modal>
);

ListingSortSheet.displayName = 'ListingSortSheet';
