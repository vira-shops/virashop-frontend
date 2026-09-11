'use client';

import * as React from 'react';
import { FormProvider, useForm, type FieldValues, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/utils/ui';
import type { FormProps } from './types';

export function Form<TFieldValues extends FieldValues>({
  schema,
  onSubmit,
  children,
  className,
  ...formProps
}: FormProps<TFieldValues>) {
  const resolver = schema
    ? (zodResolver(schema as never) as unknown as Resolver<TFieldValues>)
    : undefined;

  const form = useForm<TFieldValues>({ ...formProps, resolver });

  return (
    <FormProvider {...form}>
      <form
        noValidate
        className={cn('flex flex-col gap-11', className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {typeof children === 'function' ? children(form) : children}
      </form>
    </FormProvider>
  );
}
