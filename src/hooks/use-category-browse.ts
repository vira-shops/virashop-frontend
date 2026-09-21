'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse } from '@/connections';
import { findCategoryBrowseBySlug } from '@/contracts/endpoints/categories/contract';
import type { CategoryBrowseResponse } from '@/contracts/endpoints/categories';
import { queryKeys } from './query-keys';

/** See `use-products.ts` for why mock mode is branched explicitly here. */
const isMockMode = !process.env.NEXT_PUBLIC_API_BASE_URL;

/** `GET /categories/:slug` — one node + its ancestors + its children. */
export const useCategoryBrowse = (
  slug: string,
): UseQueryResult<CategoryBrowseResponse, FailedApiResponse> =>
  useQuery<CategoryBrowseResponse, FailedApiResponse>({
    queryKey: queryKeys.categoryBrowse(slug),
    enabled: Boolean(slug),
    queryFn: async () => {
      if (isMockMode) {
        const browse = findCategoryBrowseBySlug(slug);

        if (!browse) {
          throw {
            status: 404,
            message: 'Category not found',
            errorCode: 'CATEGORY_NOT_FOUND',
          } satisfies FailedApiResponse;
        }

        return browse;
      }

      const response = await api('categories', 'getBySlug', {}, { pathParams: { slug } });

      if (response.status !== 200) {
        throw response;
      }

      return response.data;
    },
  });
