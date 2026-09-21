'use client';

import * as React from 'react';
import { SearchResultsSection } from '@/components/shared';
import { PATHS } from '@/routes/paths';

export interface SearchResultsProps {
  query: string;
}

/** Retail search results — shared section scoped to the retail channel + routes. */
export const SearchResults: React.FC<SearchResultsProps> = ({ query }) => (
  <SearchResultsSection
    channel="RETAIL"
    query={query}
    hrefForProduct={(slug) => PATHS.RETAIL.PRODUCT(slug)}
    hrefForCategory={(slug) => PATHS.RETAIL.CATEGORY(slug)}
  />
);

SearchResults.displayName = 'SearchResults';
