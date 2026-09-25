'use client';

import * as React from 'react';
import { FormSelect } from '@/components/shared';
import { useCities, useProvinces } from '@/hooks';
import type { ProfileFormValues } from '@/features/buyer-dashboard/validation/profile-schema';
import { cn } from '@/utils/ui';
import { PROFILE_FIELD_PROPS, PROFILE_LABEL_CLASS, PROFILE_LABELS as L } from './constants';
import type { ProfileFieldGroupProps } from './types';

/** «محل کسب‌وکار» — province + city pickers side by side under one legend. */
export const LocationField: React.FC<Pick<ProfileFieldGroupProps, 'editing'>> = ({ editing }) => {
  const provinces = useProvinces();
  const cities = useCities();

  return (
    <fieldset className="flex flex-col gap-4">
      <legend className={cn(PROFILE_LABEL_CLASS, 'mb-4')}>{L.location}</legend>
      <div className="grid grid-cols-2 gap-5">
        <FormSelect<ProfileFormValues>
          name="province"
          aria-label={L.province}
          searchable
          disabled={!editing}
          {...PROFILE_FIELD_PROPS}
        >
          {(provinces.data ?? []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FormSelect>
        <FormSelect<ProfileFormValues>
          name="city"
          aria-label={L.city}
          searchable
          disabled={!editing}
          {...PROFILE_FIELD_PROPS}
        >
          {(cities.data ?? []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FormSelect>
      </div>
    </fieldset>
  );
};
