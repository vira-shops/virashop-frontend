import type { ReactNode } from 'react';
import type { FieldValues, Path, UseFormProps, UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';
import type { SelectProps, TextInputProps } from '@/components/ui';

export interface FormProps<TFieldValues extends FieldValues> extends Omit<
  UseFormProps<TFieldValues>,
  'resolver'
> {
  /** Zod schema — wired through `zodResolver` when provided. */
  schema?: z.ZodType<TFieldValues>;
  onSubmit: (values: TFieldValues) => void | Promise<void>;
  children: ReactNode | ((form: UseFormReturn<TFieldValues>) => ReactNode);
  className?: string;
}

export interface FormInputProps<TFieldValues extends FieldValues> extends Omit<
  TextInputProps,
  'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur'
> {
  name: Path<TFieldValues>;
}

export interface FormSelectProps<TFieldValues extends FieldValues> extends Omit<
  SelectProps,
  'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'searchable'
> {
  name: Path<TFieldValues>;
}
