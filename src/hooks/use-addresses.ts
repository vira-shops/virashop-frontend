'use client';

import { useMutation, useQuery, useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import { api, type FailedApiResponse } from '@/connections';
import type { Address, AddressInput, AddressesResponse } from '@/contracts/endpoints/addresses';
import { queryKeys } from './query-keys';

/*
 * The buyer's saved addresses — shared by the checkout picker and the
 * dashboard «آدرس ها» page. Not live on the backend yet — every call forces
 * its contract mock. Remove `useMock` here when the routes ship.
 */

export const useAddresses = (): UseQueryResult<AddressesResponse, FailedApiResponse> =>
  useQuery<AddressesResponse, FailedApiResponse>({
    queryKey: queryKeys.addresses(),
    queryFn: async () => {
      const response = await api('addresses', 'getList', { useMock: true });

      if (response.status !== 200) throw response;

      return response.data;
    },
  });

/** Create (no `id`) or update (with `id`) — the payload the address form submits. */
export type SaveAddressInput = AddressInput & { id?: number };

/** Puts a saved address into the list: replaces it in place, or appends a new one. */
export const upsertAddress = (list: AddressesResponse, saved: Address): AddressesResponse => {
  const next = list.some((item) => item.id === saved.id)
    ? list.map((item) => (item.id === saved.id ? saved : item))
    : [...list, saved];

  // Only one address can be the default.
  return saved.isDefault
    ? next.map((item) => (item.id === saved.id ? item : { ...item, isDefault: false }))
    : next;
};

export const useSaveAddress = () => {
  const queryClient = useQueryClient();
  const key = queryKeys.addresses();

  return useMutation<Address, FailedApiResponse, SaveAddressInput>({
    mutationKey: [...key, 'save'],
    mutationFn: async ({ id, ...body }) => {
      const response =
        id === undefined
          ? await api('addresses', 'create', { useMock: true, body })
          : await api(
              'addresses',
              'update',
              { useMock: true, body: { ...body, id } },
              { pathParams: { id } },
            );

      if (response.status !== 200) throw response;

      // The mock echoes a fixed address — keep what the user just saved
      // instead. With the live route the response already equals this.
      const current = queryClient.getQueryData<AddressesResponse>(key) ?? [];
      const nextId = id ?? Math.max(0, ...current.map((item) => item.id)) + 1;

      return { ...body, id: nextId };
    },
    onSuccess: (saved) => {
      queryClient.setQueryData<AddressesResponse>(key, (current) =>
        upsertAddress(current ?? [], saved),
      );
    },
  });
};

/** Marks one address as the default (the radio in the list). Optimistic. */
export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();
  const key = queryKeys.addresses();

  return useMutation<void, FailedApiResponse, number, { previous?: AddressesResponse }>({
    mutationKey: [...key, 'set-default'],
    mutationFn: async (id) => {
      const response = await api(
        'addresses',
        'setDefault',
        { useMock: true },
        { pathParams: { id } },
      );

      if (response.status !== 200) throw response;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<AddressesResponse>(key);

      queryClient.setQueryData<AddressesResponse>(key, (current) =>
        current?.map((item) => ({ ...item, isDefault: item.id === id })),
      );

      return { previous };
    },
    onError: (_error, _id, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous);
    },
  });
};

/** Deletes an address. Optimistic — the card disappears at once and returns on failure. */
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  const key = queryKeys.addresses();

  return useMutation<void, FailedApiResponse, number, { previous?: AddressesResponse }>({
    mutationKey: [...key, 'remove'],
    mutationFn: async (id) => {
      const response = await api('addresses', 'remove', { useMock: true }, { pathParams: { id } });

      if (response.status !== 200) throw response;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<AddressesResponse>(key);

      queryClient.setQueryData<AddressesResponse>(key, (current) =>
        current?.filter((item) => item.id !== id),
      );

      return { previous };
    },
    onError: (_error, _id, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous);
    },
  });
};
