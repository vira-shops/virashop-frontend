'use client';

import * as React from 'react';
import { FormSelect } from '@/components/shared';
import type { RoleValues } from '@/features/auth/validation/schema';
import { ROLE_FORM_COPY as COPY } from './constants';
import type { RoleSelectFieldProps } from './types';

/** Non-filterable catalog picker — every role field shares this shape. */
export const RoleSelectField: React.FC<RoleSelectFieldProps> = ({ name, label, options }) => (
  <FormSelect<RoleValues>
    name={name}
    label={label}
    placeholder={COPY.selectPlaceholder}
    searchable
    filterable={false}
    fullWidth
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </FormSelect>
);
