'use client';

import * as React from 'react';
import { TextInput } from '@/components/ui';
import { SearchIcon } from '@icons';
import { usePlaceSearch } from '@/hooks';
import { LOCATION_PICKER_COPY as C } from './constants';
import type { PlaceSearchProps } from './types';

/** «جستجو و ...» — Enter looks the place up and drops the pin there. */
export const PlaceSearch: React.FC<PlaceSearchProps> = ({ onFound }) => {
  const search = usePlaceSearch();
  const [query, setQuery] = React.useState('');

  const message = search.isPending
    ? C.searching
    : search.isError
      ? C.searchFailed
      : search.isSuccess && !search.data
        ? C.notFound
        : undefined;

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        // The modal is portaled, but React still bubbles the submit to any
        // form that renders the picker (e.g. the address form) — stop it here.
        event.stopPropagation();
        search.mutate(query, {
          onSuccess: (place) => place && onFound({ lat: place.lat, lng: place.lng }),
        });
      }}
    >
      <TextInput
        type="search"
        variant="ghost"
        fullWidth
        aria-label={C.searchLabel}
        placeholder={C.search}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        rightIcon={<SearchIcon className="size-8" aria-hidden="true" />}
        inputMessage={message}
        state={search.isError || (search.isSuccess && !search.data) ? 'error' : undefined}
        className="bg-blue-50"
      />
    </form>
  );
};
