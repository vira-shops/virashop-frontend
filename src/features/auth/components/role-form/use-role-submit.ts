'use client';

import * as React from 'react';
import type { AuthSession } from '@/contracts/endpoints/auth';
import { useOtpRequest, useSignupStep2 } from '@/hooks';
import { useAuthFlowStore } from '@/features/auth/store';
import type { RoleValues } from '@/features/auth/validation/schema';
import { authErrorMessage, pickErrorCode } from '@/features/auth/utils';
import { ALREADY_REGISTERED_CODES } from './constants';

/**
 * Signup step 2. A phone that turns out to be registered already is not an
 * error for the user — we switch to login and send them an OTP instead.
 */
export const useRoleSubmit = (onSuccess: (session: AuthSession) => void) => {
  const draft = useAuthFlowStore((state) => state.draft);
  const patchDraft = useAuthFlowStore((state) => state.patchDraft);
  const setMode = useAuthFlowStore((state) => state.setMode);
  const setStep = useAuthFlowStore((state) => state.setStep);
  const markOtpSent = useAuthFlowStore((state) => state.markOtpSent);
  const signupStep2 = useSignupStep2();
  const otpRequest = useOtpRequest();

  const [serverError, setServerError] = React.useState<string | null>(null);

  const submit = async (values: RoleValues) => {
    setServerError(null);

    patchDraft({
      accountType: values.accountType,
      activityType: values.activityType,
      guildType: values.guildType ?? '',
      industryType: values.industryType ?? '',
      category: values.category ?? '',
      documentType: values.documentType,
    });

    const base = { phone: draft.phone, channel: draft.channel, activityType: values.activityType };

    try {
      const session = await signupStep2.mutateAsync(
        values.accountType === 'BUYER'
          ? { ...base, accountType: 'BUYER', guildType: values.guildType ?? '' }
          : {
              ...base,
              accountType: values.accountType,
              industryType: values.industryType ?? '',
              category: values.category ?? '',
              documentType: values.documentType,
              document: values.document,
            },
      );

      onSuccess(session);
    } catch (error) {
      const code = pickErrorCode(error);

      if (code && ALREADY_REGISTERED_CODES.includes(code)) {
        try {
          await otpRequest.mutateAsync({ phone: draft.phone });
          setMode('login');
          setStep('otp');
          markOtpSent();
          return;
        } catch (requestError) {
          setServerError(authErrorMessage(requestError));
          return;
        }
      }

      setServerError(authErrorMessage(error));
    }
  };

  const defaultValues: RoleValues = {
    accountType: draft.accountType ?? 'BUYER',
    activityType: draft.activityType,
    guildType: draft.guildType || undefined,
    industryType: draft.industryType || undefined,
    category: draft.category || undefined,
    documentType: draft.documentType,
    document: null,
  };

  return { submit, defaultValues, serverError, submitting: signupStep2.isPending };
};
