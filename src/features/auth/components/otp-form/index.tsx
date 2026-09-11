'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Button, OtpInput, Typography } from '@/components/ui';
import { Form } from '@/components/shared';
import { useOtpRequest, useOtpVerify } from '@/hooks';
import type { AuthUser } from '@/contracts/endpoints/auth';
import { useAuthFlowStore } from '@/features/auth/store';
import { useOtpTimer } from '@/features/auth/hooks';
import { OtpCodeSchema, type OtpCodeValues } from '@/features/auth/validation/schema';
import { pickErrorCode, authErrorMessage, toPersianDigits } from '@/features/auth/utils';

interface OtpFormProps {
  /** Fires once `/auth/otp/verify` returns the JWT + user. */
  onSuccess: (accessToken: string, user: AuthUser) => void;
  /** «تغییر شماره» — back to the credentials step. */
  onChangePhone: () => void;
}

/**
 * OTP step — 6 digits, 120s TTL, 60s resend cooldown. Handles both the
 * login resend (`/auth/otp/request`) and the expired-signup-draft case.
 */
export function OtpForm({ onSuccess, onChangePhone }: OtpFormProps) {
  const draft = useAuthFlowStore((state) => state.draft);
  const otpSentAt = useAuthFlowStore((state) => state.otpSentAt);
  const markOtpSent = useAuthFlowStore((state) => state.markOtpSent);
  const verify = useOtpVerify();
  const otpRequest = useOtpRequest();
  const { remainingTtl, remainingCooldown } = useOtpTimer(otpSentAt);

  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleSubmit = async ({ code }: OtpCodeValues) => {
    setServerError(null);

    try {
      const { accessToken, user } = await verify.mutateAsync({ phone: draft.phone, code });
      onSuccess(accessToken, user);
    } catch (error) {
      const code = pickErrorCode(error);

      if (code === 'ACCOUNT_NOT_FOUND') {
        // Signup draft expired server-side (~120s) — start over.
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
      defaultValues={{ code: '' }}
      onSubmit={handleSubmit}
    >
      {(form) => {
        const codeError = form.formState.errors.code?.message as string | undefined;
        const errorMessage = codeError ?? serverError ?? undefined;

        return (
          <>
            <Typography variant="h4" className="text-center text-black">
              کد تایید
            </Typography>
            <Typography variant="body-sm" className="text-center text-gray-400">
              کد ۶ رقمی به شماره {toPersianDigits(draft.phone)} ارسال شد{' '}
              <button
                type="button"
                onClick={onChangePhone}
                className="text-primary cursor-pointer underline"
              >
                تغییر شماره
              </button>
            </Typography>

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
                  // OtpInput guarantees 6 ASCII digits — submit directly.
                  onComplete={(value) => void handleSubmit({ code: value })}
                  autoFocus
                  state={errorMessage ? 'error' : undefined}
                  message={errorMessage}
                />
              )}
            />

            <div className="flex flex-col items-center gap-2">
              {remainingTtl > 0 ? (
                <Typography variant="caption-md" className="text-gray-400">
                  اعتبار کد: {toPersianDigits(remainingTtl)} ثانیه
                </Typography>
              ) : (
                <Typography variant="caption-md" className="text-warning-red">
                  کد تایید منقضی شده است
                </Typography>
              )}

              <Button
                type="button"
                variant="ghost"
                size="sm"
                color="primary"
                disabled={remainingCooldown > 0 || otpRequest.isPending}
                onClick={handleResend}
              >
                {remainingCooldown > 0
                  ? `ارسال مجدد تا ${toPersianDigits(remainingCooldown)} ثانیه دیگر`
                  : 'ارسال مجدد کد'}
              </Button>
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
