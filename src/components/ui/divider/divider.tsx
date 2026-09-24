import * as React from 'react';
import { cn } from '@/utils/ui';
import { DividerProps, DividerVariant } from './types';

const variantClasses: Record<DividerVariant, string> = {
  solid: 'divider-solid',
  dashed: 'divider-dashed',
};

/** Horizontal rule, optionally captioned at its start (the right edge in RTL). */
export const Divider: React.FC<DividerProps> = ({
  label,
  variant = 'solid',
  className,
  labelClassName,
  lineClassName,
  ...rest
}) => (
  <div
    role="separator"
    aria-orientation="horizontal"
    data-slot="divider"
    className={cn('divider', variantClasses[variant], className)}
    {...rest}
  >
    {label && <span className={cn('divider-label', labelClassName)}>{label}</span>}
    <span aria-hidden="true" className={cn('divider-line', lineClassName)} />
  </div>
);

Divider.displayName = 'Divider';
