'use client';

import { useFormContext, type FieldValues } from 'react-hook-form';
import { Select } from '@/components/ui';
import type { FormSelectProps } from './types';

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  ...props
}: FormSelectProps<TFieldValues>) {
  const { register, formState } = useFormContext<TFieldValues>();
  const error = formState.errors[name];
  const message = (error?.message as string | undefined) ?? props.inputMessage;

  return (
    <Select
      {...props}
      {...register(name)}
      state={error ? 'error' : props.state}
      inputMessage={message}
    />
  );
}
