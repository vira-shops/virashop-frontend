'use client';

import * as React from 'react';
import { Button, Typography } from '@/components/ui';
import { Form, FormInput } from '@/components/shared';
import { useOtpRequest } from '@/hooks';
import { useAuthFlowStore } from '@/features/auth/store';
import { LoginSchema, type LoginValues } from '@/features/auth/validation/schema';
import { normalizeIranianMobile, authErrorMessage } from '@/features/auth/utils';
import { PATHS } from '@/routes/paths';
import { LOGIN_FORM_COPY as COPY } from './constants';

export function LoginForm() {
  const draft = useAuthFlowStore((state) => state.draft);
  const patchDraft = useAuthFlowStore((state) => state.patchDraft);
  const setStep = useAuthFlowStore((state) => state.setStep);
  const markOtpSent = useAuthFlowStore((state) => state.markOtpSent);
  const otpRequest = useOtpRequest();

  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleSubmit = async (values: LoginValues) => {
    setServerError(null);

    const phone = normalizeIranianMobile(values.phone);
    patchDraft({ phone });

    try {
      await otpRequest.mutateAsync({ phone });
      setStep('otp');
      markOtpSent();
    } catch (error) {
      setServerError(authErrorMessage(error));
    }
  };

  return (
    <Form<LoginValues>
      schema={LoginSchema}
      defaultValues={{ phone: draft.phone }}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Typography variant="h3" className="text-center">
          {COPY.title}
        </Typography>
        <div className="flex items-center gap-1 text-center text-neutral-400">
          <Typography variant="body-12">{COPY.noAccount}</Typography>
          <Typography href={PATHS.AUTH.REGISTER} variant="body-12" className="text-blue-500">
            {COPY.registerLink}
          </Typography>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <FormInput<LoginValues>
          name="phone"
          label={COPY.phoneLabel}
          inputMode="tel"
          fullWidth
          autoComplete="tel"
          autoFocus
          inputMessage={serverError ?? undefined}
          state={serverError ? 'error' : undefined}
        />

        <Button type="submit" color="primary" size="xl" fullWidth disabled={otpRequest.isPending}>
          {otpRequest.isPending ? COPY.submitting : COPY.submit}
        </Button>
      </div>
    </Form>
  );
}
