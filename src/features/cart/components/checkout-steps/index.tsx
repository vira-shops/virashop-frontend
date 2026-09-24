'use client';

import * as React from 'react';
import { Button } from '@/components/ui';
import { CardIcon, Shop2Icon, ShoppingCartIcon, TruckIcon } from '@icons';
import { cn } from '@/utils/ui';
import { CHECKOUT_STEPS } from '@/features/cart/constants';
import type { CheckoutStep } from '@/hooks';

export interface CheckoutStepsProps {
  current: CheckoutStep;
  /** Jumps back to an already-completed step; forward steps are inert. */
  onStepClick: (step: CheckoutStep) => void;
}

const STEP_ICONS: Record<CheckoutStep, React.FC<React.SVGProps<SVGSVGElement>>> = {
  invoices: Shop2Icon,
  cart: ShoppingCartIcon,
  shipping: TruckIcon,
  payment: CardIcon,
};

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ current, onStepClick }) => {
  const currentIndex = CHECKOUT_STEPS.findIndex((step) => step.id === current);
  const progress = ((currentIndex + 1) / CHECKOUT_STEPS.length) * 100;

  return (
    <nav
      aria-label="مراحل خرید"
      className="rounded-4 md:rounded-8 relative h-12 bg-gray-100 px-7 md:h-14 md:px-5"
    >
      <ol className="flex h-full items-center justify-between md:justify-center md:gap-20">
        {CHECKOUT_STEPS.map((step, index) => {
          const Icon = STEP_ICONS[step.id];
          const isDone = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <li key={step.id}>
              <Button
                variant="ghost"
                size="xs"
                aria-current={isCurrent ? 'step' : undefined}
                disabled={index > currentIndex}
                onClick={() => onStepClick(step.id)}
                className={cn(
                  'flex h-auto min-w-0 items-center gap-1 px-0 transition-colors md:gap-7',
                  'text-body-xs md:text-body-sm hover:bg-transparent',
                  isCurrent ? 'text-primary' : isDone ? 'text-primary-900' : 'text-gray-700',
                  index > currentIndex ? 'cursor-default' : 'cursor-pointer',
                )}
                rightIcon={<Icon className="size-8 shrink-0 md:size-11" aria-hidden="true" />}
              >
                {step.label}
              </Button>
            </li>
          );
        })}
      </ol>

      <span
        aria-hidden="true"
        style={{ width: `${progress}%` }}
        className="bg-primary absolute inset-s-0 bottom-0 h-0.5 rounded-full transition-[width] duration-300"
      />
    </nav>
  );
};

CheckoutSteps.displayName = 'CheckoutSteps';
