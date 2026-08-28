import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/ui';
import { ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from './types';

const colorClasses: Record<ButtonColor, string> = {
  primary: 'button-primary',
  blue: 'button-blue',
  yellow: 'button-yellow',
  wholesale: 'button-wholesale',
  retail: 'button-retail',
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

const buildClassName = (
  color: ButtonColor,
  variant: ButtonVariant,
  size: ButtonSize,
  hasIcon: boolean,
  fullWidth: boolean | undefined,
  fullRounded: boolean | undefined,
  disabled: boolean | undefined,
  className: string | undefined,
) =>
  cn(
    'button',
    colorClasses[color],
    variantClasses[variant],
    hasIcon ? iconSizeClasses[size] : sizeClasses[size],
    disabled && 'button-disabled',
    fullWidth && 'button-fullWidth',
    fullRounded && 'button-fullRounded',
    className,
  );

const renderContent = (
  icon: React.ReactNode | undefined,
  rightIcon: React.ReactNode | undefined,
  children: React.ReactNode,
  leftIcon: React.ReactNode | undefined,
) =>
  icon ? (
    icon
  ) : (
    <>
      {rightIcon}
      {children}
      {leftIcon}
    </>
  );

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'fill',
    color = 'primary',
    size = 'md',
    leftIcon,
    rightIcon,
    icon,
    fullWidth,
    fullRounded,
    className,
    children,
    ...rest
  } = props;

  const className_ = buildClassName(
    color,
    variant,
    size,
    Boolean(icon),
    fullWidth,
    fullRounded,
    'disabled' in rest ? rest.disabled : undefined,
    className,
  );

  const content = renderContent(icon, rightIcon, children, leftIcon);

  if ('href' in rest && rest.href !== undefined) {
    const {
      href,
      disabled: _disabled,
      type: _type,
      ...linkRest
    } = rest as ButtonProps & {
      href: string;
    };

    return (
      <Link href={href} className={className_} {...linkRest}>
        {content}
      </Link>
    );
  }

  const { type = 'button', disabled } = rest as ButtonProps & { href?: undefined };

  return (
    <button
      type={type}
      disabled={disabled}
      className={className_}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};
