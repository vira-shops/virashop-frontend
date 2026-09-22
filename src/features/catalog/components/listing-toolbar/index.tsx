'use client';

import * as React from 'react';
import { Button } from '@/components/ui';
import { FilterIcon, SortIcon } from '@icons';

export interface ListingToolbarProps {
  onFilterClick: () => void;
  onSortClick: () => void;
}

/** Mobile-only bar that opens the filter / sort bottom sheets. */
export const ListingToolbar: React.FC<ListingToolbarProps> = ({ onFilterClick, onSortClick }) => (
  <div className="flex items-center gap-3 md:hidden">
    <Button
      size="md"
      color="primary"
      fullWidth
      onClick={onFilterClick}
      rightIcon={<FilterIcon className="size-8" />}
      className="bg-primary-500/10 text-black"
    >
      فیلتر
    </Button>
    <Button
      size="md"
      color="primary"
      fullWidth
      onClick={onSortClick}
      rightIcon={<SortIcon className="size-8" />}
      className="bg-primary-500/10 text-black"
    >
      مرتب سازی
    </Button>
  </div>
);

ListingToolbar.displayName = 'ListingToolbar';
