'use client';

import * as React from 'react';
import { Button, Typography } from '@/components/ui';
import { Form, FormInput } from '@/components/shared';
import { useOtpRequest } from '@/hooks';
import { useAuthFlowStore } from '@/features/auth/store';
import { CredentialsSchema, type CredentialsValues } from '@/features/auth/validation/schema';
import { normalizeIranianMobile, pickErrorCode, authErrorMessage } from '@/features/auth/utils';

/**
 * Step 1 — first name, last name, mobile. Works for both entry modes:
 * an existing phone goes straight to the OTP step, an unknown phone
 * (`ACCOUNT_NOT_FOUND`) switches the wizard to the signup path.
 */
export function CredentialsForm() {
  const draft = useAuthFlowStore((state) => state.draft);
  const patchDraft = useAuthFlowStore((state) => state.patchDraft);
  const setMode = useAuthFlowStore((state) => state.setMode);
  const setStep = useAuthFlowStore((state) => state.setStep);
  const markOtpSent = useAuthFlowStore((state) => state.markOtpSent);
  const otpRequest = useOtpRequest();

  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleSubmit = async (values: CredentialsValues) => {
    setServerError(null);

    const phone = normalizeIranianMobile(values.phone);
    patchDraft({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      phone,
    });

    try {
      await otpRequest.mutateAsync({ phone });
      setMode('login');
      setStep('otp');
      markOtpSent();
    } catch (error) {
      const code = pickErrorCode(error);

      if (code === 'ACCOUNT_NOT_FOUND') {
        // Unknown phone — the API has no pending signup for it. Role
        // selection comes first, then `/auth/signup` sends the code.
        setMode('signup');
        setStep('role');
        return;
      }

      setServerError(authErrorMessage(error));
    }
  };

  return (
    <Form<CredentialsValues>
      schema={CredentialsSchema}
      defaultValues={{
        firstName: draft.firstName,
        lastName: draft.lastName,
        phone: draft.phone,
      }}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Typography variant="h3" className="text-center">
          ایجاد حساب کاربری
        </Typography>
        <div className="flex items-center gap-1 text-center text-neutral-400">
          <Typography variant="body-12">قبلا ثبت نام کردید ؟</Typography>
          <Typography href="/auth/login" variant="body-12" className="text-blue-500">
            وارد شوید
          </Typography>
        </div>
      </div>

      <div className="flex gap-8">
        <FormInput<CredentialsValues>
          name="firstName"
          label="نام"
          fullWidth
          autoComplete="given-name"
        />
        <FormInput<CredentialsValues>
          name="lastName"
          label="نام خانوادگی"
          fullWidth
          autoComplete="family-name"
        />
      </div>
      <FormInput<CredentialsValues>
        name="phone"
        label="شماره موبایل"
        inputMode="tel"
        fullWidth
        autoComplete="tel"
        inputMessage={serverError ?? undefined}
        state={serverError ? 'error' : undefined}
      />

      <Button type="submit" color="primary" size="lg" fullWidth disabled={otpRequest.isPending}>
        {otpRequest.isPending ? 'در حال ارسال...' : 'ادامه'}
      </Button>
    </Form>
  );
}
