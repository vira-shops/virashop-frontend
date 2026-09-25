import type { AuthFlowMode, AuthFlowStep } from '@/features/auth/types';

export interface AuthWizardProps {
  initialMode: AuthFlowMode;
}

export type StepWidthMap = Record<AuthFlowStep, string>;

export interface AuthWizardCopy {
  /** Toast after a successful login / signup. */
  welcome: (firstName: string) => string;
  /** Toast after the booth form is submitted for review. */
  boothSubmitted: string;
}
