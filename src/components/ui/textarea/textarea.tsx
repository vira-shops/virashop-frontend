'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import { TextareaColor, TextareaProps, TextareaState, TextareaVariant } from './types';

const variantClasses: Record<TextareaVariant, string> = {
  outline: 'input-outline',
  fill: 'input-fill',
  ghost: 'input-ghost',
};

const colorClasses: Record<TextareaColor, string> = {
  primary: 'input-primary',
  blue: 'input-blue',
  yellow: 'input-yellow',
};

const stateClasses: Record<TextareaState, string> = {
  error: 'input-error',
  success: 'input-success',
  warning: 'input-warning',
};

const stateMessageClasses: Record<TextareaState, string> = {
  error: 'text-warning-red',
  success: 'text-warning-green',
  warning: 'text-yellow-100',
};

/** Multi-line sibling of `TextInput` — same label / message / state contract. */
export const Textarea: React.FC<TextareaProps> = ({
  variant = 'outline',
  color = 'primary',
  state,
  label,
  inputMessage,
  fullWidth,
  disabled,
  dir = 'rtl',
  rows = 4,
  className,
  wrapperClassName,
  labelClassName,
  messageClassName,
  ref,
  ...props
}) => {
  const autoId = React.useId();
  const id = props.id ?? autoId;

  return (
    <div
      dir={dir}
      className={cn('flex flex-col items-start gap-4', fullWidth && 'w-full', wrapperClassName)}
    >
      {label && (
        <label htmlFor={id} className={cn('input-label', labelClassName)}>
          {label}
        </label>
      )}
      <textarea
        {...props}
        id={id}
        ref={ref}
        dir={dir}
        rows={rows}
        disabled={disabled}
        aria-invalid={state === 'error' || undefined}
        className={cn(
          'textarea',
          variantClasses[variant],
          colorClasses[color],
          state && stateClasses[state],
          disabled && 'input-disabled',
          className,
        )}
      />
      {inputMessage && (
        <p className={cn('input-message', state && stateMessageClasses[state], messageClassName)}>
          {inputMessage}
        </p>
      )}
    </div>
  );
};

Textarea.displayName = 'Textarea';
