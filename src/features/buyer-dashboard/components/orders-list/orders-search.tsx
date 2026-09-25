'use client';

import * as React from 'react';
import { SearchIcon } from '@icons';
import { TextInput } from '@/components/ui';
import { ORDERS_TOOLBAR } from './constants';
import type { OrdersSearchProps } from './types';

/** Tracking-code search — submits on Enter; an empty query clears the filter. */
export const OrdersSearch: React.FC<OrdersSearchProps> = ({ initialQuery, onSubmit }) => {
  const [draft, setDraft] = React.useState(initialQuery ?? '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(draft.trim() || null);
  };

  return (
    <form role="search" onSubmit={handleSubmit}>
      <TextInput
        aria-label={ORDERS_TOOLBAR.searchLabel}
        placeholder={ORDERS_TOOLBAR.searchPlaceholder}
        inputMode="numeric"
        variant="fill"
        fullWidth
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        rightIcon={<SearchIcon className="size-7" aria-hidden="true" />}
      />
    </form>
  );
};
