import { InputHTMLAttributes, ReactNode, Ref } from 'react';

export type TextInputVariant = 'outline' | 'fill' | 'ghost';

export type TextInputColor = 'primary' | 'blue' | 'yellow';

export type TextInputState = 'error' | 'success' | 'warning';

export type TextInputSize = 'sm' | 'md' | 'lg';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: TextInputVariant;
  color?: TextInputColor;
  state?: TextInputState;
  size?: TextInputSize;
  label?: string;
  inputMessage?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  fullWidth?: boolean;
  dir?: 'rtl' | 'ltr' | 'auto';
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  wrapperClassName?: string;
  labelClassName?: string;
  fieldClassName?: string;
  messageClassName?: string;
  ref?: Ref<HTMLInputElement>;
}
