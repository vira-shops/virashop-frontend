'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Button, OtpInput, Typography } from '@/components/ui';
import { Form } from '@/components/shared';
import { useOtpRequest, useOtpVerify } from '@/hooks';
import { isNeedsStep2 } from '@/contracts/endpoints/auth';
import { useAuthFlowStore } from '@/features/auth/store';
import { useOtpTimer } from '@/features/auth/hooks';
import { OtpCodeSchema, type OtpCodeValues } from '@/features/auth/validation/schema';
import { pickErrorCode, authErrorMessage, toPersianDigits } from '@/features/auth/utils';
import { OTP_FORM_COPY as COPY } from './constants';
import type { OtpFormProps } from './types';

const formatCountdown = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${toPersianDigits(minutes)}:${toPersianDigits(String(seconds).padStart(2, '0'))}`;
};

export function OtpForm({ onSuccess, onNeedsStep2, onChangePhone }: OtpFormProps) {
  const draft = useAuthFlowStore((state) => state.draft);
  const otpSentAt = useAuthFlowStore((state) => state.otpSentAt);
  const markOtpSent = useAuthFlowStore((state) => state.markOtpSent);
  const verify = useOtpVerify();
  const otpRequest = useOtpRequest();
  const { remainingCooldown } = useOtpTimer(otpSentAt);

  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleSubmit = async ({ code }: OtpCodeValues) => {
    setServerError(null);

    try {
      const result = await verify.mutateAsync({ phone: draft.phone, code });

      if (isNeedsStep2(result)) {
        onNeedsStep2(result);
        return;
      }

      onSuccess(result);
    } catch (error) {
      const code = pickErrorCode(error);

      if (code === 'ACCOUNT_NOT_FOUND') {
        setServerError(COPY.signupExpired);
        onChangePhone();
        return;
      }

      setServerError(authErrorMessage(error));
    }
  };

  const handleResend = async () => {
    setServerError(null);

    try {
      await otpRequest.mutateAsync({ phone: draft.phone });
      markOtpSent();
    } catch (error) {
      setServerError(authErrorMessage(error));
    }
  };

  return (
    <Form<OtpCodeValues>
      schema={OtpCodeSchema}
      title={COPY.title}
      description={
        <div className="flex flex-col items-center">
          <Typography variant="body-sm" className="text-center text-gray-400">
            {COPY.sentTo(toPersianDigits(draft.phone))}
          </Typography>
          <Typography variant="body-sm" className="text-center text-gray-400">
            {COPY.enterBelow}
          </Typography>
        </div>
      }
      onBack={onChangePhone}
      defaultValues={{ code: '' }}
      onSubmit={handleSubmit}
    >
      {(form) => {
        const codeError = form.formState.errors.code?.message as string | undefined;
        const errorMessage = codeError ?? serverError ?? undefined;

        return (
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <Controller
                name="code"
                control={form.control}
                render={({ field }) => (
                  <OtpInput
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      setServerError(null);
                    }}
                    onComplete={(value) => void handleSubmit({ code: value })}
                    size="md"
                    autoFocus
                    state={errorMessage ? 'error' : undefined}
                    message={errorMessage}
                  />
                )}
              />

              <div className="flex justify-start">
                {remainingCooldown > 0 ? (
                  <Typography variant="caption-md" className="text-gray-400">
                    {COPY.resendIn(formatCountdown(remainingCooldown))}
                  </Typography>
                ) : (
                  <Button
                    variant="ghost"
                    size="xs"
                    disabled={otpRequest.isPending}
                    onClick={handleResend}
                    className="text-caption-md h-auto p-0 hover:bg-transparent"
                  >
                    {COPY.resend}
                  </Button>
                )}
              </div>
            </div>

            <Button type="submit" color="primary" size="xl" fullWidth disabled={verify.isPending}>
              {verify.isPending ? COPY.submitting : COPY.submit}
            </Button>
          </div>
        );
      }}
    </Form>
  );
}
