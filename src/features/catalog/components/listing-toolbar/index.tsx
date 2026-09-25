'use client';

import * as React from 'react';
import { Button } from '@/components/ui';
import { FilterIcon, SortIcon } from '@icons';
import { FILTER_LABEL, SORT_LABEL, TOOLBAR_BUTTON_CLASS } from './constants';
import type { ListingToolbarProps } from './types';

export type { ListingToolbarProps } from './types';

/** Mobile-only bar that opens the filter / sort bottom sheets. */
export const ListingToolbar: React.FC<ListingToolbarProps> = ({ onFilterClick, onSortClick }) => (
  <div className="mt-8 flex items-center gap-3 md:hidden">
    <Button
      size="md"
      color="primary"
      fullWidth
      onClick={onFilterClick}
      rightIcon={<FilterIcon className="size-8" />}
      className={TOOLBAR_BUTTON_CLASS}
    >
      {FILTER_LABEL}
    </Button>
    <Button
      size="md"
      color="primary"
      fullWidth
      onClick={onSortClick}
      rightIcon={<SortIcon className="size-8" />}
      className={TOOLBAR_BUTTON_CLASS}
    >
      {SORT_LABEL}
    </Button>
  </div>
);

ListingToolbar.displayName = 'ListingToolbar';
