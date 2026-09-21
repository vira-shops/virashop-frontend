'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { FailedApiResponse } from '@/connections';
import { buildPopularCategoriesMock } from '@/contracts/endpoints/categories/contract';
import type { PopularCategoriesResponse } from '@/contracts/endpoints/categories/schemas';
import type { Channel } from '@/validations/primitives';
import { queryKeys } from './query-keys';

export type PopularCategoriesError = FailedApiResponse;

export const usePopularCategories = (
  channel: Channel = 'RETAIL',
): UseQueryResult<PopularCategoriesResponse, PopularCategoriesError> =>
  useQuery<PopularCategoriesResponse, PopularCategoriesError>({
    queryKey: queryKeys.popularCategories(channel),
    queryFn: async () => {
      // Not part of the real backend contract yet — always use the mock,
      // built per-channel so category/product hrefs match the storefront
      // that is actually rendering them (see buildPopularCategoriesMock).
      return buildPopularCategoriesMock(channel);
    },
  });
