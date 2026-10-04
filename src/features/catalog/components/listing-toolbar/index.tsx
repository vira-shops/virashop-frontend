'use client';

import * as React from 'react';
import { Button } from '@/components/ui';
import { FilterIcon, SortIcon } from '@icons';
import { FILTER_LABEL, SORT_LABEL, TOOLBAR_BUTTON_CLASS } from './constants';
import type { ListingToolbarProps } from './types';

export type { ListingToolbarProps } from './types';

/**
 * Mobile-only bar that opens the filter / sort bottom sheets — one white
 * strip split down the middle, as drawn, not two separate buttons.
 */
export const ListingToolbar: React.FC<ListingToolbarProps> = ({ onFilterClick, onSortClick }) => (
  <div className="rounded-4 flex h-[41px] items-stretch border border-gray-100 bg-white md:hidden">
    <Button
      variant="ghost"
      size="md"
      fullWidth
      onClick={onFilterClick}
      rightIcon={<FilterIcon className="text-primary size-8" />}
      className={TOOLBAR_BUTTON_CLASS}
    >
      {FILTER_LABEL}
    </Button>
    <span className="my-2 w-px shrink-0 bg-gray-100" aria-hidden="true" />
    <Button
      variant="ghost"
      size="md"
      fullWidth
      onClick={onSortClick}
      rightIcon={<SortIcon className="text-primary size-8" />}
      className={TOOLBAR_BUTTON_CLASS}
    >
      {SORT_LABEL}
    </Button>
  </div>
);

ListingToolbar.displayName = 'ListingToolbar';
