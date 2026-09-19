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
  /**
   * Only meaningful when `searchable`. `false` renders the same styled
   * listbox as a plain, non-filterable picker: the trigger shows the
   * selected label (never an editable query) and typing does nothing —
   * use this to replace a native `<select>`'s unstyleable open state
   * without adding a search box. Defaults to `true`.
   */
  filterable?: boolean;
  rightIcon?: ReactNode;
  onValueChange?: (value: string) => void;
  fullWidth?: boolean;
  disabled?: boolean;
  dir?: 'rtl' | 'ltr' | 'auto';
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  wrapperClassName?: string;
  labelClassName?: string;
  fieldClassName?: string;
  listClassName?: string;
  optionClassName?: string;
  messageClassName?: string;
  children?: ReactNode;
  ref?: Ref<HTMLSelectElement>;
}
