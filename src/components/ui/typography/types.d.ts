import { HTMLAttributes, ReactNode } from 'react';
import { ColorVariant } from '@/components/ui/types';

export type TypographyVariant =
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-1'
  | 'body-2'
  | 'body-3'
  | 'body-4'
  | 'body-5'
  | 'body-6'
  | 'body-7'
  | 'body-8'
  | 'body-9'
  | 'body-10'
  | 'body-11'
  | 'body-12'
  | 'body-13'
  | 'body-14'
  | 'body-15'
  | 'body-xl'
  | 'body-md'
  | 'body-sm'
  | 'body-xs'
  | 'caption-lg'
  | 'caption-md'
  | 'overline-lg'
  | 'overline-sm';

export type Tags =
  | 'p'
  | 'span'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'strong'
  | 'em'
  | 'small'
  | 'mark'
  | 'del'
  | 'ins'
  | 'sub'
  | 'sup'
  | 'label';

export type AlignType = 'right' | 'left' | 'center' | 'justify';

export type TransformValue = 'uppercase' | 'capitalize' | 'lowercase';

export type DecorationValue = 'underline' | 'lineThrough' | 'overline';

export type TruncateValue = 'end' | 'start';

export type DirValue = 'ltr' | 'rtl' | 'auto';

export type LineClampValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface TypographyProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  variant?: TypographyVariant;
  as?: Tags;
  asChild?: boolean;
  color?: ColorVariant;
  align?: AlignType;
  transform?: TransformValue;
  decoration?: DecorationValue;
  lineClamp?: LineClampValue;
  truncate?: TruncateValue;
  dir?: DirValue;
  inherit?: boolean;
  children?: ReactNode;
  className?: string;
  href?: string;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
}
