import type { AuthSession, NeedsStep2 } from '@/contracts/endpoints/auth';

export interface OtpFormProps {
  onSuccess: (session: AuthSession) => void;
  onNeedsStep2: (draft: NeedsStep2) => void;
  onChangePhone: () => void;
}

export interface OtpFormCopy {
  title: string;
  /** First description line — includes the (Persian-digit) phone number. */
  sentTo: (phone: string) => string;
  enterBelow: string;
  resend: string;
  /** Countdown label while the resend cooldown runs. */
  resendIn: (countdown: string) => string;
  submit: string;
  submitting: string;
  /** Shown when the signup draft expired server-side (`ACCOUNT_NOT_FOUND`). */
  signupExpired: string;
}
