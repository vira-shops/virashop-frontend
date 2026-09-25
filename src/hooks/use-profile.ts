'use client';

import { useMutation, useQuery, useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse } from '@/connections';
import type { Profile, ProfileUpdateRequest } from '@/contracts/endpoints/profile';
import { queryKeys } from './query-keys';

/*
 * The signed-in buyer's profile. Not live on the backend yet — every call
 * forces its contract mock. Remove `useMock` here when the routes ship.
 */

export const useProfile = (): UseQueryResult<Profile, FailedApiResponse> =>
  useQuery<Profile, FailedApiResponse>({
    queryKey: queryKeys.profile(),
    queryFn: async () => {
      const response = await api('profile', 'get', { useMock: true });

      if (response.status !== 200) throw response;

      return response.data;
    },
  });

/** Overlays the submitted fields on the cached profile (keeps avatar / document / mobile). */
export const mergeProfileUpdate = (profile: Profile, update: ProfileUpdateRequest): Profile => ({
  personal: { ...profile.personal, ...update.personal },
  business: { ...profile.business, ...update.business },
});

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const key = queryKeys.profile();

  return useMutation<Profile, FailedApiResponse, ProfileUpdateRequest>({
    mutationKey: [...key, 'update'],
    mutationFn: async (body) => {
      const response = await api('profile', 'update', { useMock: true, body });

      if (response.status !== 200) throw response;

      // The mock echoes a fixed profile — keep what the user just saved
      // instead. With the live route the response already equals this.
      return mergeProfileUpdate(response.data, body);
    },
    onSuccess: (profile) => {
      queryClient.setQueryData(key, profile);
    },
  });
};
