'use client';

import * as React from 'react';
import { FormProvider, useForm, type FieldValues, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@/components/ui';
import { ArrowLeftIcon } from '@icons';
import { cn } from '@/utils/ui';
import type { FormProps } from './types';

export function Form<TFieldValues extends FieldValues>({
  schema,
  onSubmit,
  children,
  className,
  title,
  onBack,
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
        {(title || onBack) && (
          <div className="relative flex items-center justify-center">
            {onBack && (
              <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                aria-label="بازگشت"
                className="absolute top-1/2 left-0 -translate-y-1/2 text-gray-600 transition-colors hover:bg-transparent"
                icon={<ArrowLeftIcon className="size-9" />}
              />
            )}
            {title && (
              <Typography variant="h4" className="text-black">
                {title}
              </Typography>
            )}
          </div>
        )}
        {typeof children === 'function' ? children(form) : children}
      </form>
    </FormProvider>
  );
}
