'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/feedback';
import { PATHS } from '@/routes/paths';
import { cn } from '@/utils/ui';
import type {
  AuthSession,
  AuthUser,
  NeedsStep2,
  SellerBoothResponse,
} from '@/contracts/endpoints/auth';
import { useAuthFlowStore, useAuthStore } from '@/features/auth/store';
import type { AuthFlowStep } from '@/features/auth/types';
import { AUTH_FLOW_MAX_AGE_MS } from '@/features/auth/constants';
import { LoginForm } from '@/features/auth/components/login-form';
import { CredentialsForm } from '@/features/auth/components/credentials-form';
import { RoleForm } from '@/features/auth/components/role-form';
import { OtpForm } from '@/features/auth/components/otp-form';
import { SuccessForm } from '@/features/auth/components/success-form';
import { BoothForm } from '@/features/auth/components/booth-form';
import { AUTH_WIZARD_COPY, STEP_WIDTH } from './constants';
import type { AuthWizardProps } from './types';

const isSafeReturnTo = (value: string | null): value is string =>
  Boolean(value && value.startsWith('/') && !value.startsWith('//'));

export function AuthWizard({ initialMode }: AuthWizardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const step = useAuthFlowStore((state) => state.step);
  const mode = useAuthFlowStore((state) => state.mode);
  const draft = useAuthFlowStore((state) => state.draft);
  const start = useAuthFlowStore((state) => state.start);
  const patchDraft = useAuthFlowStore((state) => state.patchDraft);
  const setStep = useAuthFlowStore((state) => state.setStep);
  const reset = useAuthFlowStore((state) => state.reset);
  const user = useAuthStore((state) => state.user);
  const setSession = useAuthStore((state) => state.setSession);
  const setUser = useAuthStore((state) => state.setUser);

  const channel = searchParams.get('channel') === 'WHOLESALE' ? 'WHOLESALE' : 'RETAIL';

  React.useEffect(() => {
    const state = useAuthFlowStore.getState();
    const hasSession = Boolean(useAuthStore.getState().accessToken);
    const resumable =
      state.mode === initialMode &&
      (state.step === 'credentials' ||
        state.step === 'role' ||
        (state.step === 'otp' &&
          state.otpSentAt !== null &&
          Date.now() - state.otpSentAt < AUTH_FLOW_MAX_AGE_MS) ||
        ((state.step === 'success' || state.step === 'booth') && hasSession));

    if (!resumable) {
      start(initialMode, channel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const effectiveStep: AuthFlowStep = (() => {
    if (step === 'otp' && !draft.phone) return 'credentials';
    if ((step === 'role' || step === 'success') && mode !== 'signup') return 'credentials';
    if (step === 'booth' && !useAuthStore.getState().accessToken) return 'credentials';
    return step;
  })();

  const finish = (verifiedUser: AuthUser) => {
    reset();

    toast.success(AUTH_WIZARD_COPY.welcome(verifiedUser.firstName));

    const returnTo = searchParams.get('returnTo');
    const fallback = channel === 'WHOLESALE' ? PATHS.WHOLESALE.ROOT : PATHS.RETAIL.ROOT;
    router.push(isSafeReturnTo(returnTo) ? returnTo : fallback);
  };

  const handleVerified = ({ accessToken, user: verifiedUser }: AuthSession) => {
    setSession(accessToken, verifiedUser);

    const needsBooth = Boolean(verifiedUser.seller) && !verifiedUser.seller?.profileComplete;

    if (needsBooth) {
      setStep('booth');
      return;
    }

    finish(verifiedUser);
  };

  /** OTP verified for a fresh signup draft — no token yet; role comes next. */
  const handleNeedsStep2 = (step2Draft: NeedsStep2) => {
    patchDraft({
      phone: step2Draft.phone,
      firstName: step2Draft.firstName,
      lastName: step2Draft.lastName,
    });
    setStep('role');
  };

  const handleStep2Completed = ({ accessToken, user: signedUpUser }: AuthSession) => {
    setSession(accessToken, signedUpUser);

    if (signedUpUser.seller) {
      setStep('success');
      return;
    }

    finish(signedUpUser);
  };

  const handleBoothCompleted = (booth: SellerBoothResponse) => {
    const currentUser = useAuthStore.getState().user;

    if (!currentUser) return;

    setUser({ ...currentUser, seller: booth });

    toast.info(AUTH_WIZARD_COPY.boothSubmitted);
    finish(currentUser);
  };

  return (
    <div className={cn('flex w-full flex-col gap-8', STEP_WIDTH[effectiveStep])}>
      {effectiveStep === 'credentials' &&
        ((mode ?? initialMode) === 'login' ? <LoginForm /> : <CredentialsForm />)}
      {effectiveStep === 'otp' && (
        <OtpForm
          onSuccess={handleVerified}
          onNeedsStep2={handleNeedsStep2}
          onChangePhone={() => setStep('credentials')}
        />
      )}
      {effectiveStep === 'role' && mode === 'signup' && (
        <RoleForm onSuccess={handleStep2Completed} onBack={() => setStep('credentials')} />
      )}
      {effectiveStep === 'success' && mode === 'signup' && (
        <SuccessForm
          onCompleteProfile={() => setStep('booth')}
          onSkip={() => user && finish(user)}
        />
      )}
      {effectiveStep === 'booth' && <BoothForm onSuccess={handleBoothCompleted} />}
    </div>
  );
}
