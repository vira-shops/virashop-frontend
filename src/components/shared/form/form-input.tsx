'use client';

import { useFormContext, type FieldValues } from 'react-hook-form';
import { TextInput } from '@/components/ui';
import { cn } from '@/utils/ui';
import type { FormInputProps } from './types';

export function FormInput<TFieldValues extends FieldValues>({
  name,
  ...props
}: FormInputProps<TFieldValues>) {
  const { register, formState } = useFormContext<TFieldValues>();
  const error = formState.errors[name];
  const message = (error?.message as string | undefined) ?? props.inputMessage;

  return (
    <TextInput
      {...props}
      {...register(name)}
      state={error ? 'error' : props.state}
      inputMessage={message}
      labelClassName={cn('text-lg', props.labelClassName)}
    />
  );
}
