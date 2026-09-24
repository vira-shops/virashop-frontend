'use client';

import * as React from 'react';
import { Button, Typography } from '@/components/ui';
import { Form, FormInput } from '@/components/shared';
import { useSignupStep1 } from '@/hooks';
import { useAuthFlowStore } from '@/features/auth/store';
import { CredentialsSchema, type CredentialsValues } from '@/features/auth/validation/schema';
import { normalizeIranianMobile, authErrorMessage } from '@/features/auth/utils';

export function CredentialsForm() {
  const draft = useAuthFlowStore((state) => state.draft);
  const patchDraft = useAuthFlowStore((state) => state.patchDraft);
  const setStep = useAuthFlowStore((state) => state.setStep);
  const markOtpSent = useAuthFlowStore((state) => state.markOtpSent);
  const signupStep1 = useSignupStep1();

  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleSubmit = async (values: CredentialsValues) => {
    setServerError(null);

    const phone = normalizeIranianMobile(values.phone);
    const firstName = values.firstName.trim();
    const lastName = values.lastName.trim();
    patchDraft({ firstName, lastName, phone });

    try {
      await signupStep1.mutateAsync({ firstName, lastName, phone });
      setStep('otp');
      markOtpSent();
    } catch (error) {
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

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10 md:gap-9">
          <div className="flex gap-7">
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
        </div>

        <Button type="submit" color="primary" size="xl" fullWidth disabled={signupStep1.isPending}>
          {signupStep1.isPending ? 'در حال ارسال...' : 'ثبت'}
        </Button>
      </div>
    </Form>
  );
}
