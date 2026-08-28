import type { LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'fill' | 'outline' | 'ghost';

export type ButtonColor = 'primary' | 'blue' | 'yellow' | 'wholesale' | 'retail';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

type AnchorAttributes = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | 'href'>;

export type ButtonBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'href'>;

export interface ButtonAsButtonProps extends ButtonBaseProps {
  href?: undefined;
}

export interface ButtonAsLinkProps extends LinkProps, AnchorAttributes {
  href: LinkProps['href'];
  type?: never;
  disabled?: never;
}

export type ButtonProps = (ButtonAsButtonProps | ButtonAsLinkProps) & {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  fullRounded?: boolean;
  className?: string;
};
