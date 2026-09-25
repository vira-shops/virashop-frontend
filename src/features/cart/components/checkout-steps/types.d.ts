import type { ComponentType, SVGProps } from 'react';
import type { CheckoutStep } from '@/hooks';

export interface CheckoutStepsProps {
  current: CheckoutStep;
  /** Jumps back to an already-completed step; forward steps are inert. */
  onStepClick: (step: CheckoutStep) => void;
}

export type StepIconMap = Record<CheckoutStep, ComponentType<SVGProps<SVGSVGElement>>>;
