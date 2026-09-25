import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * The design-system font-size tokens from `tailwind.css` (`--text-*`).
 * Without them tailwind-merge reads `text-body-xs` as a *color* and drops it
 * whenever a real color like `text-blue-300` sits in the same class list.
 */
const FONT_SIZE_TOKENS = [
  'display-1',
  'display-2',
  'display-3',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  ...Array.from({ length: 15 }, (_, index) => `body-${index + 1}`),
  'body-xl',
  'body-md',
  'body-sm',
  'body-xs',
  'caption-lg',
  'caption-md',
  'overline-lg',
  'overline-sm',
  'md',
  'xxl',
];

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: FONT_SIZE_TOKENS,
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
