'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse } from '@/connections';
import { buildSearchSuggestionsMock } from '@/contracts/endpoints/search/contract';
import type { SearchSuggestionsResponse } from '@/contracts/endpoints/search';
import { queryKeys } from './query-keys';

/** See `use-products.ts` for why mock mode is branched explicitly here. */
const isMockMode = !process.env.NEXT_PUBLIC_API_BASE_URL;

/** `GET /search/suggestions?q=` — enabled only once the caller has a non-empty query. */
export const useSearchSuggestions = (
  q: string,
): UseQueryResult<SearchSuggestionsResponse, FailedApiResponse> =>
  useQuery<SearchSuggestionsResponse, FailedApiResponse>({
    queryKey: queryKeys.searchSuggestions(q),
    enabled: Boolean(q.trim()),
    queryFn: async () => {
      if (isMockMode) return buildSearchSuggestionsMock(q);

      const response = await api('search', 'getSuggestions', { query: { q } });

      if (response.status !== 200) throw response;

      return response.data;
    },
  });
