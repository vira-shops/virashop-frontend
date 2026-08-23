import * as React from 'react';
import { cn } from '@/utils/ui';
import { ButtonVariant, ButtonProps } from './types';

const variantClasses: Record<ButtonVariant, string> = {
  fill: 'bg-primary text-white hover:bg-primary-600',
  outline: 'border border-primary text-primary hover:bg-primary-50',
  ghost: 'text-primary hover:bg-primary-50',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'fill',
  className,
  type = 'button',
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn('button', variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
