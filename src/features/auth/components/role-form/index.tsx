'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Button, Tabs, Typography, Uploader } from '@/components/ui';
import { Form, FormSelect } from '@/components/shared';
import { useOtpRequest, useSignUp } from '@/hooks';
import { useAuthFlowStore } from '@/features/auth/store';
import {
  ACCOUNT_TYPE_OPTIONS,
  ACTIVITY_TYPE_OPTIONS,
  CATEGORY_OPTIONS,
  DOCUMENT_ACCEPT,
  DOCUMENT_TYPE_OPTIONS,
  GUILD_TYPE_OPTIONS,
  INDUSTRY_TYPE_OPTIONS,
} from '@/features/auth/constants';
import { RoleSchema, type RoleValues } from '@/features/auth/validation/schema';
import { pickErrorCode, authErrorMessage } from '@/features/auth/utils';

export function RoleForm() {
  const draft = useAuthFlowStore((state) => state.draft);
  const patchDraft = useAuthFlowStore((state) => state.patchDraft);
  const setMode = useAuthFlowStore((state) => state.setMode);
  const setStep = useAuthFlowStore((state) => state.setStep);
  const markOtpSent = useAuthFlowStore((state) => state.markOtpSent);
  const signUp = useSignUp();
  const otpRequest = useOtpRequest();

  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleSubmit = async (values: RoleValues) => {
    setServerError(null);

    patchDraft({
      accountType: values.accountType,
      activityType: values.activityType,
      guildType: values.guildType ?? '',
      industryType: values.industryType ?? '',
      category: values.category ?? '',
      documentType: values.documentType,
    });

    const base = {
      firstName: draft.firstName,
      lastName: draft.lastName,
      phone: draft.phone,
      channel: draft.channel,
      activityType: values.activityType,
    };

    try {
      await signUp.mutateAsync(
        values.accountType === 'BUYER'
          ? {
              ...base,
              accountType: 'BUYER',
              guildType: values.guildType ?? '',
            }
          : {
              ...base,
              accountType: values.accountType,
              industryType: values.industryType ?? '',
              category: values.category ?? '',
              documentType: values.documentType,
              document: values.document,
            },
      );

      setStep('otp');
      markOtpSent();
    } catch (error) {
      const code = pickErrorCode(error);

      if (code === 'PHONE_ALREADY_REGISTERED' || code === 'SELLER_ALREADY_EXISTS') {
        // A verified account already exists — fall back to the login path.
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

  return (
    <Form<RoleValues>
      schema={RoleSchema}
      defaultValues={{
        accountType: draft.accountType ?? 'BUYER',
        activityType: draft.activityType,
        guildType: draft.guildType || undefined,
        industryType: draft.industryType || undefined,
        category: draft.category || undefined,
        documentType: draft.documentType,
        document: null,
      }}
      onSubmit={handleSubmit}
    >
      {(form) => {
        const accountType = form.watch('accountType');
        const isBuyer = accountType === 'BUYER';

        return (
          <>
            <Typography variant="h4" className="text-center text-black">
              نقش خود را انتخاب کنید
            </Typography>
            <Typography variant="body-sm" className="text-center text-gray-400">
              نحوه فعالیت خود در ویراشاپ را مشخص کنید
            </Typography>

            <Controller
              name="accountType"
              control={form.control}
              render={({ field }) => (
                <Tabs
                  items={ACCOUNT_TYPE_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  fullWidth
                  aria-label="نقش"
                />
              )}
            />

            <FormSelect<RoleValues>
              name="activityType"
              label="نوع فعالیت"
              placeholder="انتخاب کنید"
              fullWidth
            >
              {ACTIVITY_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FormSelect>

            {isBuyer ? (
              <FormSelect<RoleValues>
                name="guildType"
                label="گروه صنفی"
                placeholder="انتخاب کنید"
                fullWidth
              >
                {GUILD_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormSelect>
            ) : (
              <>
                <FormSelect<RoleValues>
                  name="industryType"
                  label="حوزه فعالیت"
                  placeholder="انتخاب کنید"
                  fullWidth
                >
                  {INDUSTRY_TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </FormSelect>
                <FormSelect<RoleValues>
                  name="category"
                  label="دسته‌بندی کالا"
                  placeholder="انتخاب کنید"
                  fullWidth
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </FormSelect>
                <FormSelect<RoleValues> name="documentType" label="نوع مدرک" fullWidth>
                  {DOCUMENT_TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </FormSelect>
                <Controller
                  name="document"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <Uploader
                        label="تصویر مدرک"
                        placeholder="فایل مدرک را بارگذاری کنید"
                        accept={DOCUMENT_ACCEPT}
                        file={field.value ?? null}
                        onChange={field.onChange}
                      />
                      {fieldState.error && (
                        <Typography variant="caption-md" className="text-warning-red">
                          {fieldState.error.message}
                        </Typography>
                      )}
                    </div>
                  )}
                />
              </>
            )}

            {serverError && (
              <Typography variant="caption-md" className="text-warning-red">
                {serverError}
              </Typography>
            )}

            <Button type="submit" color="primary" size="lg" fullWidth disabled={signUp.isPending}>
              {signUp.isPending ? 'در حال ثبت‌نام...' : 'ثبت‌نام و دریافت کد'}
            </Button>
          </>
        );
      }}
    </Form>
  );
}
