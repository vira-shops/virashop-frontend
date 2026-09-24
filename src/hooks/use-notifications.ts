'use client';

import { useMutation, useQuery, useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse } from '@/connections';
import type {
  AnnouncementsResponse,
  NotificationsListResponse,
} from '@/contracts/endpoints/notifications';
import { queryKeys } from './query-keys';

/*
 * Notifications + announcements. Not live on the backend yet — every call
 * forces its contract mock. Remove `useMock` here when the routes ship.
 */

export const useNotifications = (): UseQueryResult<NotificationsListResponse, FailedApiResponse> =>
  useQuery<NotificationsListResponse, FailedApiResponse>({
    queryKey: queryKeys.notifications(),
    queryFn: async () => {
      const response = await api('notifications', 'getList', { useMock: true });

      if (response.status !== 200) throw response;

      return response.data;
    },
  });

export const useAnnouncements = (): UseQueryResult<AnnouncementsResponse, FailedApiResponse> =>
  useQuery<AnnouncementsResponse, FailedApiResponse>({
    queryKey: queryKeys.announcements(),
    queryFn: async () => {
      const response = await api('notifications', 'getAnnouncements', { useMock: true });

      if (response.status !== 200) throw response;

      return response.data;
    },
  });

/**
 * Marks one notification read. Optimistic — the card mutes instantly and
 * rolls back if the request fails.
 */
export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  const key = queryKeys.notifications();

  return useMutation<void, FailedApiResponse, number, { previous?: NotificationsListResponse }>({
    mutationKey: [...key, 'mark-read'],
    mutationFn: async (id) => {
      const response = await api(
        'notifications',
        'markRead',
        { useMock: true },
        { pathParams: { id } },
      );

      if (response.status !== 200) throw response;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<NotificationsListResponse>(key);

      queryClient.setQueryData<NotificationsListResponse>(key, (current) =>
        current?.map((item) => (item.id === id ? { ...item, read: true } : item)),
      );

      return { previous };
    },
    onError: (_error, _id, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous);
    },
  });
};
