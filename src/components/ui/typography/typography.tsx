import * as React from 'react';
import Link from 'next/link';
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

/* Display variants render as heading tags by default (display-1 → h1, etc.). */
const displayTags: Partial<Record<TypographyVariant, Tags>> = {
  'display-1': 'h1',
  'display-2': 'h2',
  'display-3': 'h3',
};

const variantClasses: Record<TypographyVariant, string> = {
  'display-1': 'typography-display-1',
  'display-2': 'typography-display-2',
  'display-3': 'typography-display-3',
  h1: 'typography-h1',
  h2: 'typography-h2',
  h3: 'typography-h3',
  h4: 'typography-h4',
  h5: 'typography-h5',
  h6: 'typography-h6',
  'body-1': 'typography-body-1',
  'body-2': 'typography-body-2',
  'body-3': 'typography-body-3',
  'body-4': 'typography-body-4',
  'body-5': 'typography-body-5',
  'body-6': 'typography-body-6',
  'body-7': 'typography-body-7',
  'body-8': 'typography-body-8',
  'body-9': 'typography-body-9',
  'body-10': 'typography-body-10',
  'body-11': 'typography-body-11',
  'body-12': 'typography-body-12',
  'body-13': 'typography-body-13',
  'body-14': 'typography-body-14',
  'body-15': 'typography-body-15',
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
  href,
  replace,
  scroll,
  prefetch,
  ...props
}) => {
  const Tag = (as ??
    (headingVariants.includes(variant) ? variant : (displayTags[variant] as Tags | undefined)) ??
    'p') as Tags;

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

  if (href) {
    return (
      <Link href={href} replace={replace} scroll={scroll} prefetch={prefetch}>
        <Tag data-slot="typography" dir={dir} className={classes}>
          {children}
        </Tag>
      </Link>
    );
  }

  return (
    <Tag data-slot="typography" dir={dir} className={classes} {...props}>
      {children}
    </Tag>
  );
};
