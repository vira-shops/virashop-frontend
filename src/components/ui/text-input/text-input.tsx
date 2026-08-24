'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import {
  TextInputProps,
  TextInputVariant,
  TextInputColor,
  TextInputState,
  TextInputSize,
} from './types';

const variantClasses: Record<TextInputVariant, string> = {
  outline: 'input-outline',
  fill: '',
  ghost: 'input-ghost',
};

const colorClasses: Record<TextInputColor, string> = {
  primary: 'input-primary',
  blue: 'input-blue',
  yellow: 'input-yellow',
};

const stateClasses: Record<TextInputState, string> = {
  error: 'input-error',
  success: 'input-success',
  warning: 'input-warning',
};

const stateMessageClasses: Record<TextInputState, string> = {
  error: 'text-warning-red',
  success: 'text-warning-green',
  warning: 'text-yellow-100',
};

const sizeClasses: Record<TextInputSize, string> = {
  sm: 'input-sm',
  md: 'input-md',
  lg: 'input-lg',
};

export const TextInput: React.FC<TextInputProps> = ({
  variant = 'outline',
  color = 'primary',
  state,
  size = 'md',
  label,
  inputMessage,
  rightIcon,
  leftIcon,
  fullWidth,
  disabled,
  dir = 'rtl',
  className,
  ref,
  ...props
}) => {
  const autoId = React.useId();
  const inputId = props.id ?? autoId;
  const showMessage = Boolean(inputMessage);

  return (
    <div dir={dir} className={cn('flex flex-col items-start gap-2', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <div
        className={cn(
          'input',
          variantClasses[variant],
          colorClasses[color],
          state && stateClasses[state],
          sizeClasses[size],
          disabled && 'input-disabled',
          fullWidth && 'input-fullWidth',
          className,
        )}
      >
        {rightIcon}
        <input
          {...props}
          id={inputId}
          ref={ref}
          dir={dir}
          type={props.type ?? 'text'}
          disabled={disabled}
          className="h-full w-full flex-1 focus:outline-none"
        />
        {leftIcon}
      </div>
      {showMessage && (
        <p className={cn('input-message', state && stateMessageClasses[state])}>{inputMessage}</p>
      )}
    </div>
  );
};
