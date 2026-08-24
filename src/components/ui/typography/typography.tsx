import * as React from 'react';
import { cn } from '@/utils/ui';
import { ColorVariant } from '@/components/ui/types';
import {
  TypographyProps,
  TypographyVariant,
  AlignType,
  TransformValue,
  DecorationValue,
  TruncateValue,
  LineClampValue,
  Tags,
} from './types';

const headingVariants: TypographyVariant[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'typography-h1',
  h2: 'typography-h2',
  h3: 'typography-h3',
  h4: 'typography-h4',
  h5: 'typography-h5',
  h6: 'typography-h6',
  'body-xl': 'typography-body-xl',
  'body-md': 'typography-body-md',
  'body-sm': 'typography-body-sm',
  'body-xs': 'typography-body-xs',
  'caption-lg': 'typography-caption-lg',
  'caption-md': 'typography-caption-md',
  'overline-lg': 'typography-overline-lg',
  'overline-sm': 'typography-overline-sm',
};

const colorClasses: Record<ColorVariant, string> = {
  primary: 'typography-primary',
  blue: 'typography-blue',
  gray: 'typography-gray',
  black: 'typography-black',
  white: 'typography-white',
  'warning-red': 'typography-warning-red',
  'warning-green': 'typography-warning-green',
  'warning-blue': 'typography-warning-blue',
};

const alignClasses: Record<AlignType, string> = {
  right: 'text-right',
  left: 'text-left',
  center: 'text-center',
  justify: 'text-justify',
};

const transformClasses: Record<TransformValue, string> = {
  uppercase: 'uppercase',
  capitalize: 'capitalize',
  lowercase: 'lowercase',
};

const decorationClasses: Record<DecorationValue, string> = {
  underline: 'underline',
  lineThrough: 'line-through',
  overline: 'overline',
};

const truncateClasses: Record<TruncateValue, string> = {
  end: 'truncate',
  start: 'truncate-start',
};

const lineClampClasses: Record<LineClampValue, string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
  7: 'line-clamp-7',
  8: 'line-clamp-8',
  9: 'line-clamp-9',
  10: 'line-clamp-10',
  11: 'line-clamp-11',
  12: 'line-clamp-12',
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body-md',
  as,
  asChild = false,
  color,
  align,
  transform,
  decoration,
  lineClamp,
  truncate,
  dir = 'auto',
  inherit = false,
  className,
  children,
  ...props
}) => {
  const Tag = (as ?? (headingVariants.includes(variant) ? variant : 'p')) as Tags;

  const classes = cn(
    'typography',
    variantClasses[variant],
    color && colorClasses[color],
    align && alignClasses[align],
    transform && transformClasses[transform],
    decoration && decorationClasses[decoration],
    lineClamp && lineClampClasses[lineClamp],
    truncate && truncateClasses[truncate],
    inherit && 'typography-inherit',
    className,
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;

    return React.cloneElement(child, {
      ...props,
      className: cn(classes, child.props.className),
    });
  }

  return (
    <Tag data-slot="typography" dir={dir} className={classes} {...props}>
      {children}
    </Tag>
  );
};
