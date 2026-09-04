'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse, type SuccessfulApiResponse } from '@/connections';
import type { StoryItem } from '@/components/shared';
import { landingQueryKeys } from './query-keys';
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
    queryKey: landingQueryKeys.activeStories(),
    queryFn: async () => {
      const response = await api('stories', 'getActive');

      if (response.status !== 200) {
        throw response;
      }

      return response.data.map(toStoryItem);
    },
  });
};
