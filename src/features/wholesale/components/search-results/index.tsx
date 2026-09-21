'use client';

import * as React from 'react';
import { SearchResultsSection } from '@/components/shared';
import { PATHS } from '@/routes/paths';

export interface SearchResultsProps {
  query: string;
}

/** Wholesale search results — shared section scoped to the wholesale channel + routes. */
export const SearchResults: React.FC<SearchResultsProps> = ({ query }) => (
  <SearchResultsSection
    channel="WHOLESALE"
    query={query}
    hrefForProduct={(slug) => PATHS.WHOLESALE.PRODUCT(slug)}
    hrefForCategory={(slug) => PATHS.WHOLESALE.CATEGORY(slug)}
  />
);

SearchResults.displayName = 'SearchResults';
