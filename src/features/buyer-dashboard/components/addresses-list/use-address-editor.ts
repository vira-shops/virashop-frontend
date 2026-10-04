'use client';

import * as React from 'react';
import { useToast } from '@/components/feedback';
import {
  useAddresses,
  useCities,
  useDeleteAddress,
  useProvinces,
  useSaveAddress,
  useSetDefaultAddress,
} from '@/hooks';
import type { Address } from '@/contracts/endpoints/addresses';
import {
  toSaveAddressInput,
  type AddressFormValues,
} from '@/features/buyer-dashboard/validation/address-schema';
import { ADDRESS_COPY } from './constants';
import type { AddressEditorTarget } from './types';

/** Saved addresses + which one the form edits + label lookups for the cards. */
export const useAddressEditor = () => {
  const addresses = useAddresses();
  const provinces = useProvinces();
  const cities = useCities();
  const save = useSaveAddress();
  const remove = useDeleteAddress();
  const setDefault = useSetDefaultAddress();
  const toast = useToast();
  const [target, setTarget] = React.useState<AddressEditorTarget>(null);

  const items = addresses.data ?? [];

  /** «یزد - اردکان» — labels when the pickers have loaded, raw values until then. */
  const regionOf = (address: Address): string => {
    const province =
      provinces.data?.find((option) => option.value === address.province)?.label ??
      address.province;
    const city =
      cities.data?.find((option) => option.value === address.city)?.label ?? address.city;

    return `${province} - ${city}`;
  };

  const submit = async (values: AddressFormValues) => {
    const existing = target === 'new' ? null : target;

    try {
      await save.mutateAsync(toSaveAddressInput(values, existing, items.length === 0));
      toast.success(ADDRESS_COPY.saved);
      setTarget(null);
    } catch {
      toast.error(ADDRESS_COPY.saveFailed);
    }
  };

  const removeAddress = (id: number) => {
    remove.mutate(id, { onSuccess: () => toast.success(ADDRESS_COPY.removed) });
  };

  /** 1-based number for the form heading — the next slot when adding. */
  const formIndex =
    target === null || target === 'new' ? items.length + 1 : items.indexOf(target) + 1;

  return {
    loading: addresses.isLoading,
    items,
    target,
    formIndex,
    startAdding: () => setTarget('new'),
    startEditing: (address: Address) => setTarget(address),
    close: () => setTarget(null),
    saving: save.isPending,
    submit,
    removeAddress,
    selectDefault: (id: number) => setDefault.mutate(id),
    regionOf,
  };
};
