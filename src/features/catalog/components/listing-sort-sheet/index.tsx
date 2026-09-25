'use client';

import * as React from 'react';
import { SortIcon } from '@icons';
import { Radio, Typography } from '@/components/ui';
import { Modal } from '@/components/shared';
import { cn } from '@/utils/ui';
import {
  CATALOG_SORT_OPTIONS,
  SHEET_HEADER_CLASS,
  SORT_LABEL,
  SORT_RADIO_NAME,
  SORT_ROW_CLASS,
} from './constants';
import type { ListingSortSheetProps } from './types';

export type { ListingSortSheetProps } from './types';

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
    title={SORT_LABEL}
    icon={<SortIcon className="size-8 text-black" />}
    size="sm"
    headerClassName={SHEET_HEADER_CLASS}
  >
    <fieldset className="flex flex-col">
      <legend className="sr-only">{SORT_LABEL}</legend>
      {CATALOG_SORT_OPTIONS.map((option) => (
        <Radio
          key={option.value}
          name={SORT_RADIO_NAME}
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
          className={SORT_ROW_CLASS}
        />
      ))}
    </fieldset>
  </Modal>
);

ListingSortSheet.displayName = 'ListingSortSheet';
