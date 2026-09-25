import type { Ref, TextareaHTMLAttributes } from 'react';
import type {
  TextInputColor,
  TextInputState,
  TextInputVariant,
} from '@/components/ui/text-input/types';

export type TextareaVariant = TextInputVariant;
export type TextareaColor = TextInputColor;
export type TextareaState = TextInputState;

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Shares TextInput's surfaces so a form mixing both reads as one control family. */
  variant?: TextareaVariant;
  color?: TextareaColor;
  state?: TextareaState;
  label?: string;
  inputMessage?: string;
  fullWidth?: boolean;
  dir?: 'rtl' | 'ltr' | 'auto';
  className?: string;
  /* --- Style overrides (merged with cn; utilities outrank baked-in classes) --- */
  wrapperClassName?: string;
  labelClassName?: string;
  messageClassName?: string;
  ref?: Ref<HTMLTextAreaElement>;
}
