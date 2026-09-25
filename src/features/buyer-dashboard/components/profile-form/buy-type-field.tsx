'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Radio } from '@/components/ui';
import { cn } from '@/utils/ui';
import {
  BUY_TYPE_OPTIONS,
  PROFILE_LABEL_CLASS,
  PROFILE_LABELS as L,
  PROFILE_PANEL_CLASS,
} from './constants';
import type { ProfileFieldGroupProps } from './types';

/** «نوع خرید» — one radio per business kind, on the soft panel. */
export const BuyTypeField: React.FC<ProfileFieldGroupProps> = ({ form, editing }) => (
  <Controller
    control={form.control}
    name="buyType"
    render={({ field }) => (
      <fieldset
        disabled={!editing}
        className={cn(PROFILE_PANEL_CLASS, 'flex flex-col gap-5 disabled:opacity-60')}
      >
        <legend className={cn(PROFILE_LABEL_CLASS, 'float-start mb-5 w-full')}>{L.buyType}</legend>
        {BUY_TYPE_OPTIONS.map((option) => (
          <Radio
            key={option.value}
            name={field.name}
            value={option.value}
            label={option.label}
            size="sm"
            checked={field.value === option.value}
            onChange={() => field.onChange(option.value)}
            onBlur={field.onBlur}
          />
        ))}
      </fieldset>
    )}
  />
);
