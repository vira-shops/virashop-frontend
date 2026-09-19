'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Button, OtpInput, Typography } from '@/components/ui';
import { Form } from '@/components/shared';
import { useOtpRequest, useOtpVerify } from '@/hooks';
import type { AuthSession, NeedsStep2 } from '@/contracts/endpoints/auth';
import { isNeedsStep2 } from '@/contracts/endpoints/auth';
import { useAuthFlowStore } from '@/features/auth/store';
import { useOtpTimer } from '@/features/auth/hooks';
import { OtpCodeSchema, type OtpCodeValues } from '@/features/auth/validation/schema';
import { pickErrorCode, authErrorMessage, toPersianDigits } from '@/features/auth/utils';

interface OtpFormProps {
  onSuccess: (session: AuthSession) => void;
  onNeedsStep2: (draft: NeedsStep2) => void;
  onChangePhone: () => void;
}

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
        setServerError('مهلت ثبت‌نام به پایان رسیده است؛ دوباره تلاش کنید');
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
      title="کد تایید را وارد کنید"
      onBack={onChangePhone}
      defaultValues={{ code: '' }}
      onSubmit={handleSubmit}
    >
      {(form) => {
        const codeError = form.formState.errors.code?.message as string | undefined;
        const errorMessage = codeError ?? serverError ?? undefined;

        return (
          <>
            <div className="flex flex-col items-center gap-1">
              <Typography variant="body-sm" className="text-center text-gray-400">
                برای شماره {toPersianDigits(draft.phone)} یک کد ۶ رقمی ارسال کرده‌ایم،
              </Typography>
              <Typography variant="body-sm" className="text-center text-gray-400">
                لطفا آن را در فیلد زیر وارد نمایید.
              </Typography>
            </div>

            <div className="flex flex-col gap-4">
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
                    ارسال مجدد ({formatCountdown(remainingCooldown)})
                  </Typography>
                ) : (
                  <button
                    type="button"
                    disabled={otpRequest.isPending}
                    onClick={handleResend}
                    className="text-primary text-caption-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    ارسال مجدد
                  </button>
                )}
              </div>
            </div>

            <Button type="submit" color="primary" size="lg" fullWidth disabled={verify.isPending}>
              {verify.isPending ? 'در حال بررسی...' : 'تایید و ورود'}
            </Button>
          </>
        );
      }}
    </Form>
  );
}
