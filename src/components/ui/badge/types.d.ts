import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'fill' | 'outline' | 'soft';

export type BadgeColor =
  | 'primary'
  | 'blue'
  | 'gray'
  | 'dark'
  | 'yellow'
  | 'warning-red'
  | 'warning-green'
  | 'warning-blue';
export type BadgeSize = 'xs' | 'sm' | 'md';
export type BadgeRadius = 'sm' | 'md' | 'full';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  /** @default "full" */
  radius?: BadgeRadius;
  /** Renders before the text, on the right in RTL. */
  rightIcon?: ReactNode;
  /** Renders after the text, on the left in RTL. */
  leftIcon?: ReactNode;
  children?: ReactNode;
}
