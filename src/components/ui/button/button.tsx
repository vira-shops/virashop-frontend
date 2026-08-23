import * as React from 'react';
import { cn } from '@/utils/ui';
import { ButtonVariant, ButtonColor, ButtonSize, ButtonProps } from './types';

const colorClasses: Record<ButtonColor, string> = {
  primary: 'button-primary',
  blue: 'button-blue',
};

const variantClasses: Record<ButtonVariant, string> = {
  fill: 'button-fill',
  outline: 'button-outline',
  ghost: 'button-ghost',
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'button-text-xs',
  sm: 'button-text-sm',
  md: 'button-text-md',
  lg: 'button-text-lg',
  xl: 'button-text-xl',
  xxl: 'button-text-xxl',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  xs: 'button-icon-xs',
  sm: 'button-icon-sm',
  md: 'button-icon-md',
  lg: 'button-icon-lg',
  xl: 'button-icon-xl',
  xxl: 'button-icon-xxl',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'fill',
  color = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  icon,
  fullWidth,
  fullRounded,
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
      className={cn(
        'button',
        colorClasses[color],
        variantClasses[variant],
        icon ? iconSizeClasses[size] : sizeClasses[size],
        disabled && 'button-disabled',
        fullWidth && 'button-fullWidth',
        fullRounded && 'button-fullRounded',
        className,
      )}
      {...props}
    >
      {icon ? (
        icon
      ) : (
        <>
          {rightIcon}
          {children}
          {leftIcon}
        </>
      )}
    </button>
  );
};
