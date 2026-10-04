'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import { DateInput } from '@/components/ui';
import { FormSelect } from '@/components/shared';
import type { ProfileFormValues } from '@/features/buyer-dashboard/validation/profile-schema';
import { GENDER_OPTIONS, PROFILE_FIELD_PROPS, PROFILE_LABELS as L } from './constants';
import type { DemographicFieldProps } from './types';

/** «تاریخ تولد» — Jalali picker; the form keeps a Gregorian `YYYY-MM-DD`. */
export const BirthDateField: React.FC<DemographicFieldProps> = ({
  form,
  editing,
  requiredMark = false,
}) => (
  <Controller
    control={form.control}
    name="birthDate"
    render={({ field, fieldState }) => (
      <DateInput
        label={L.birthDate}
        requiredMark={requiredMark}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        disabled={!editing}
        state={fieldState.error ? 'error' : undefined}
        inputMessage={fieldState.error?.message}
        {...PROFILE_FIELD_PROPS}
      />
    )}
  />
);

/** «جنسیت» — مرد / زن. */
export const GenderField: React.FC<Omit<DemographicFieldProps, 'form'>> = ({
  editing,
  requiredMark = false,
}) => (
  <FormSelect<ProfileFormValues>
    name="gender"
    label={L.gender}
    requiredMark={requiredMark}
    placeholder={L.genderPlaceholder}
    searchable
    filterable={false}
    disabled={!editing}
    {...PROFILE_FIELD_PROPS}
  >
    {GENDER_OPTIONS.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </FormSelect>
);
