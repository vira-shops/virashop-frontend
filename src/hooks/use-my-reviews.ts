'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse } from '@/connections';
import type { MyQuestionsResponse, MyReviewsResponse } from '@/contracts/endpoints/reviews';
import { queryKeys } from './query-keys';

/*
 * The buyer's own reviews and questions. Not live on the backend yet —
 * every call forces its contract mock. Remove `useMock` when the routes ship.
 */

export const useMyReviews = (): UseQueryResult<MyReviewsResponse, FailedApiResponse> =>
  useQuery<MyReviewsResponse, FailedApiResponse>({
    queryKey: queryKeys.myReviews(),
    queryFn: async () => {
      const response = await api('reviews', 'getMine', { useMock: true });

      if (response.status !== 200) throw response;

      return response.data;
    },
  });

export const useMyQuestions = (): UseQueryResult<MyQuestionsResponse, FailedApiResponse> =>
  useQuery<MyQuestionsResponse, FailedApiResponse>({
    queryKey: queryKeys.myQuestions(),
    queryFn: async () => {
      const response = await api('reviews', 'getMyQuestions', { useMock: true });

      if (response.status !== 200) throw response;

      return response.data;
    },
  });
