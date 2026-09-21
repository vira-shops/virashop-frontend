'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse } from '@/connections';
import { buildSearchMock } from '@/contracts/endpoints/search/contract';
import type { SearchQuery, SearchResponse } from '@/contracts/endpoints/search';
import { queryKeys } from './query-keys';

/** See `use-products.ts` for why mock mode is branched explicitly here. */
const isMockMode = !process.env.NEXT_PUBLIC_API_BASE_URL;

/** `GET /search?q=&page=&limit=&sort=&channel=...` — full search results page. */
export const useSearch = (query: SearchQuery): UseQueryResult<SearchResponse, FailedApiResponse> =>
  useQuery<SearchResponse, FailedApiResponse>({
    queryKey: queryKeys.searchResults(query),
    queryFn: async () => {
      if (isMockMode) return buildSearchMock(query);

      const response = await api('search', 'search', { query });

      if (response.status !== 200) throw response;

      return response.data;
    },
  });
