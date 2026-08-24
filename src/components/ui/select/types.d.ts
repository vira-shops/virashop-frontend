import { ReactNode, Ref, SelectHTMLAttributes } from 'react';

export type SelectVariant = 'outline' | 'fill' | 'ghost';

export type SelectColor = 'primary' | 'blue' | 'yellow';

export type SelectState = 'error' | 'success' | 'warning';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  variant?: SelectVariant;
  color?: SelectColor;
  state?: SelectState;
  size?: SelectSize;
  label?: string;
  inputMessage?: string;
  placeholder?: string;
  searchable?: boolean;
  rightIcon?: ReactNode;
  onValueChange?: (value: string) => void;
  fullWidth?: boolean;
  disabled?: boolean;
  dir?: 'rtl' | 'ltr' | 'auto';
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLSelectElement>;
}
