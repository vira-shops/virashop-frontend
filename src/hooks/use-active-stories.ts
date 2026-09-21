'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse, type SuccessfulApiResponse } from '@/connections';
import type { StoryItem } from '@/components/shared';
import { queryKeys } from './query-keys';
import type { StoryWire } from '@/contracts/endpoints/stories/schemas';

export type ActiveStoriesData = SuccessfulApiResponse<StoryWire[]>;
export type ActiveStoriesError = FailedApiResponse;

const toStoryItem = (wire: StoryWire): StoryItem => ({
  src: wire.src,
  alt: wire.alt,
  title: wire.title,
  description: wire.description,
  duration: wire.duration,
});

export const useActiveStories = (): UseQueryResult<StoryItem[], ActiveStoriesError> => {
  return useQuery<StoryItem[], ActiveStoriesError>({
    queryKey: queryKeys.activeStories(),
    queryFn: async () => {
      // Not part of the real backend contract yet — always use the mock.
      const response = await api('stories', 'getActive', { useMock: true });

      if (response.status !== 200) {
        throw response;
      }

      return response.data.map(toStoryItem);
    },
  });
};
