'use client';

import * as React from 'react';
import { Button } from '@/components/ui';
import { BasketIcon, CarIcon, PaymentIcon, TaskSquareIcon } from '@icons';
import { cn } from '@/utils/ui';
import { CHECKOUT_STEPS } from '@/features/cart/constants';
import type { CheckoutStep } from '@/hooks';

export interface CheckoutStepsProps {
  current: CheckoutStep;
  /** Jumps back to an already-completed step; forward steps are inert. */
  onStepClick: (step: CheckoutStep) => void;
}

const STEP_ICONS: Record<CheckoutStep, React.FC<React.SVGProps<SVGSVGElement>>> = {
  invoices: TaskSquareIcon,
  cart: BasketIcon,
  shipping: CarIcon,
  payment: PaymentIcon,
};

/**
 * The four-stage progress bar. Three label states, per the design: a step you
 * have passed is primary-900, the one you are on is primary, and the ones
 * ahead stay gray. The amber bar behind grows with progress.
 */
export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ current, onStepClick }) => {
  const currentIndex = CHECKOUT_STEPS.findIndex((step) => step.id === current);
  const progress = ((currentIndex + 1) / CHECKOUT_STEPS.length) * 100;

  return (
    <nav
      aria-label="مراحل خرید"
      className="rounded-8 no-scrollbar relative overflow-x-auto bg-gray-100 px-5 pt-4 pb-5 md:h-14 md:py-0"
    >
      {/* Four labelled steps do not fit a phone, so the row scrolls rather
          than clipping the last one. */}
      <ol className="flex min-w-max items-center justify-between md:h-full md:min-w-0 md:justify-center md:gap-20">
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
                  'flex items-center gap-2 transition-colors hover:bg-transparent',
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

      {/* Grows from the start (right in RTL) toward the current step. */}
      <span
        aria-hidden="true"
        style={{ width: `${progress}%` }}
        className="bg-primary absolute start-0 bottom-0 h-0.5 rounded-full transition-[width] duration-300"
      />
    </nav>
  );
};

CheckoutSteps.displayName = 'CheckoutSteps';
