'use client';

import { useMutation, useQuery, useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse } from '@/connections';
import type { FavoritesListResponse } from '@/contracts/endpoints/favorites';
import { queryKeys } from './query-keys';

/*
 * The buyer's saved products. Not live on the backend yet — every call
 * forces its contract mock. Remove `useMock` here when the routes ship.
 */

export const useFavorites = (): UseQueryResult<FavoritesListResponse, FailedApiResponse> =>
  useQuery<FavoritesListResponse, FailedApiResponse>({
    queryKey: queryKeys.favorites(),
    queryFn: async () => {
      const response = await api('favorites', 'getList', { useMock: true });

      if (response.status !== 200) throw response;

      return response.data;
    },
  });

/** Unsaves a product. Optimistic — the card disappears at once and returns on failure. */
export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  const key = queryKeys.favorites();

  return useMutation<void, FailedApiResponse, number, { previous?: FavoritesListResponse }>({
    mutationKey: [...key, 'remove'],
    mutationFn: async (id) => {
      const response = await api('favorites', 'remove', { useMock: true }, { pathParams: { id } });

      if (response.status !== 200) throw response;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<FavoritesListResponse>(key);

      queryClient.setQueryData<FavoritesListResponse>(key, (current) =>
        current?.filter((item) => item.id !== id),
      );

      return { previous };
    },
    onError: (_error, _id, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous);
    },
  });
};
