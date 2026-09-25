import { CardIcon, Shop2Icon, ShoppingCartIcon, TruckIcon } from '@icons';
import type { StepIconMap } from './types';

export const CHECKOUT_STEPS_LABEL = 'مراحل خرید';

export const STEP_ICONS: StepIconMap = {
  invoices: Shop2Icon,
  cart: ShoppingCartIcon,
  shipping: TruckIcon,
  payment: CardIcon,
};

/** Current step · completed steps · steps still ahead. */
export const STEP_TONE_CLASSES = {
  current: 'text-primary',
  done: 'text-primary-900',
  ahead: 'text-gray-700',
} as const;
