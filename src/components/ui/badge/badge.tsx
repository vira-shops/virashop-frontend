import * as React from 'react';
import { cn } from '@/utils/ui';
import { BadgeColor, BadgeProps, BadgeRadius, BadgeSize, BadgeVariant } from './types';

const variantClasses: Record<BadgeVariant, string> = {
  fill: 'badge-fill',
  outline: 'badge-outline',
  soft: 'badge-soft',
};

const colorClasses: Record<BadgeColor, string> = {
  primary: 'badge-primary',
  'warning-red': 'badge-warning-red',
  'warning-green': 'badge-warning-green',
  'warning-blue': 'badge-warning-blue',
  yellow: 'badge-yellow',
  blue: 'badge-blue',
  gray: 'badge-gray',
  dark: 'badge-dark',
};

const sizeClasses: Record<BadgeSize, string> = {
  xs: 'badge-size-xs',
  sm: 'badge-size-sm',
  md: 'badge-size-md',
};

const radiusClasses: Record<BadgeRadius, string> = {
  sm: 'badge-radius-sm',
  md: 'badge-radius-md',
  full: 'badge-radius-full',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'fill',
  color = 'primary',
  size = 'sm',
  radius = 'full',
  rightIcon,
  leftIcon,
  className,
  children,
  ...rest
}) => {
  return (
    <span
      dir="rtl"
      data-slot="badge"
      className={cn(
        'badge',
        variantClasses[variant],
        colorClasses[color],
        sizeClasses[size],
        radiusClasses[radius],
        className,
      )}
      {...rest}
    >
      {rightIcon}
      {children}
      {leftIcon}
    </span>
  );
};
