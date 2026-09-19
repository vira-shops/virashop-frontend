'use client';

import { Controller, useFormContext, type FieldValues } from 'react-hook-form';
import { Select } from '@/components/ui';
import type { FormSelectProps } from './types';

/**
 * `Controller` (not `register`) — `Select` is a custom control, not a
 * native `<select>`. `register`-based uncontrolled fields read their
 * submitted value straight off the DOM node's `ref`, which for a
 * custom-listbox trigger shows the human-readable label, not the option
 * value; `Controller` keeps RHF and `Select` in sync purely through
 * `value`/`onChange`, so there is no DOM value to misread.
 */
export function FormSelect<TFieldValues extends FieldValues>({
  name,
  ...props
}: FormSelectProps<TFieldValues>) {
  const { control, formState } = useFormContext<TFieldValues>();
  const error = formState.errors[name];
  const message = (error?.message as string | undefined) ?? props.inputMessage;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...props}
          name={field.name}
          value={field.value ?? ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          ref={field.ref}
          state={error ? 'error' : props.state}
          inputMessage={message}
        />
      )}
    />
  );
}
