'use client';

import * as React from 'react';
import { Textarea } from '@/components/ui';
import { LocationPickerField } from '@/components/shared';
import { cn } from '@/utils/ui';
import {
  ADDRESS_FIELD_PLACEHOLDER,
  ADDRESS_PANEL_CLASS,
  ADDRESS_TEXTAREA_CLASS,
} from './constants';
import type { AddressFieldProps } from './types';

/**
 * «آدرس» — street line + map pin in one panel (profile «اطلاعات تکمیلی» and
 * the address form). Text sits first (right), the tile beside it on wide
 * screens and under it on phones.
 */
export const AddressField: React.FC<AddressFieldProps> = ({
  label,
  requiredMark = false,
  textareaProps,
  location,
  onLocationChange,
  error,
  hint,
  disabled = false,
  theme,
  tileClassName = 'md:w-1/2',
  labelClassName,
  className,
}) => {
  const id = React.useId();
  const message = error ?? hint;

  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      <label htmlFor={id} className={cn('input-label', labelClassName)}>
        {label}
        {requiredMark && (
          <span aria-hidden="true" className="input-required-mark">
            {' *'}
          </span>
        )}
      </label>

      <div className={cn(ADDRESS_PANEL_CLASS, error && 'ring-warning-red ring-1')}>
        <Textarea
          {...textareaProps}
          id={id}
          variant="ghost"
          rows={3}
          placeholder={ADDRESS_FIELD_PLACEHOLDER}
          disabled={disabled}
          state={error ? 'error' : undefined}
          wrapperClassName="flex-1 self-stretch"
          className={ADDRESS_TEXTAREA_CLASS}
        />
        <LocationPickerField
          value={location}
          onChange={onLocationChange}
          disabled={disabled}
          theme={theme}
          className={cn('shrink-0', tileClassName)}
        />
      </div>

      {message && (
        <p className={cn('input-message', error ? 'text-warning-red' : 'text-gray-300')}>
          {message}
        </p>
      )}
    </div>
  );
};
