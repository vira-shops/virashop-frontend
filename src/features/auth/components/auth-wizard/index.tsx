'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/feedback';
import { PATHS } from '@/routes/paths';
import type { AuthUser, SellerBoothResponse } from '@/contracts/endpoints/auth';
import { useAuthFlowStore, useAuthStore } from '@/features/auth/store';
import type { AuthFlowStep } from '@/features/auth/types';
import { AUTH_FLOW_MAX_AGE_MS } from '@/features/auth/constants';
import { CredentialsForm } from '@/features/auth/components/credentials-form';
import { RoleForm } from '@/features/auth/components/role-form';
import { OtpForm } from '@/features/auth/components/otp-form';
import { BoothForm } from '@/features/auth/components/booth-form';

interface AuthWizardProps {
  /** Entry mode — `register` starts on the signup path, `login` is adaptive. */
  initialMode: 'login' | 'signup';
}

const isSafeReturnTo = (value: string | null): value is string =>
  Boolean(value && value.startsWith('/') && !value.startsWith('//'));

/**
 * Auth wizard shared by `/auth/login` and `/auth/register`:
 * credentials → (role for new phones) → OTP → (booth for seller/both).
 *
 * Verifying the OTP is identity verification only — it never drops the user
 * into the site. Seller/both signups must complete the booth form first;
 * only then the wizard finishes and navigates away.
 */
export function AuthWizard({ initialMode }: AuthWizardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const step = useAuthFlowStore((state) => state.step);
  const mode = useAuthFlowStore((state) => state.mode);
  const draft = useAuthFlowStore((state) => state.draft);
  const start = useAuthFlowStore((state) => state.start);
  const setStep = useAuthFlowStore((state) => state.setStep);
  const reset = useAuthFlowStore((state) => state.reset);
  const setSession = useAuthStore((state) => state.setSession);
  const setUser = useAuthStore((state) => state.setUser);

  // Storefront context: retail/wholesale headers link here with `?channel=`.
  const channel = searchParams.get('channel') === 'WHOLESALE' ? 'WHOLESALE' : 'RETAIL';

  // Entry + refresh resume — a persisted flow with a fresh OTP (or a
  // pre-OTP / booth step) continues where it left off; otherwise start clean.
  React.useEffect(() => {
    const state = useAuthFlowStore.getState();
    const hasSession = Boolean(useAuthStore.getState().accessToken);
    const resumable =
      state.mode !== null &&
      (state.step === 'credentials' ||
        state.step === 'role' ||
        (state.step === 'otp' &&
          state.otpSentAt !== null &&
          Date.now() - state.otpSentAt < AUTH_FLOW_MAX_AGE_MS) ||
        (state.step === 'booth' && hasSession));

    if (!resumable) {
      start(initialMode, channel);
    }
    // Runs once per mount — the wizard entry point.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Derived step guard — invalid persisted states render as the first step
  // (the entry effect resets the store on mount; no setState-in-effect).
  const effectiveStep: AuthFlowStep = (() => {
    if (step === 'otp' && !draft.phone) return 'credentials';
    if (step === 'role' && mode !== 'signup') return 'credentials';
    if (step === 'booth' && !useAuthStore.getState().accessToken) return 'credentials';
    return step;
  })();

  /** End of the wizard — session exists; enter the site. */
  const finish = (verifiedUser: AuthUser) => {
    reset();

    toast.success(`خوش آمدید، ${verifiedUser.firstName}!`);

    const returnTo = searchParams.get('returnTo');
    const fallback = channel === 'WHOLESALE' ? PATHS.WHOLESALE.ROOT : PATHS.RETAIL.ROOT;
    router.push(isSafeReturnTo(returnTo) ? returnTo : fallback);
  };

  /**
   * OTP verified — identity confirmation only. Seller/both signups continue
   * to the booth form; buyers and logins are done.
   */
  const handleVerified = (accessToken: string, verifiedUser: AuthUser) => {
    setSession(accessToken, verifiedUser);

    const needsBooth =
      mode === 'signup' && Boolean(verifiedUser.seller) && !verifiedUser.seller?.profileComplete;

    if (needsBooth) {
      setStep('booth');
      return;
    }

    finish(verifiedUser);
  };

  /** Booth completed — profile is filled but the booth stays `PENDING`. */
  const handleBoothCompleted = (booth: SellerBoothResponse) => {
    const currentUser = useAuthStore.getState().user;

    if (!currentUser) return;

    setUser({ ...currentUser, seller: booth });

    toast.info('غرفه شما ثبت شد و در انتظار تایید ادمین است');
    finish(currentUser);
  };

  return (
    <div className="flex flex-col gap-8">
      {effectiveStep === 'credentials' && <CredentialsForm />}
      {effectiveStep === 'role' && mode === 'signup' && <RoleForm />}
      {effectiveStep === 'otp' && (
        <OtpForm onSuccess={handleVerified} onChangePhone={() => setStep('credentials')} />
      )}
      {effectiveStep === 'booth' && <BoothForm onSuccess={handleBoothCompleted} />}
    </div>
  );
}
