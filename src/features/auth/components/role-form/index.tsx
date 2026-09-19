'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Button, Tabs, Typography, Uploader } from '@/components/ui';
import { Form, FormSelect } from '@/components/shared';
import { useOtpRequest, useSignupStep2 } from '@/hooks';
import type { AuthSession } from '@/contracts/endpoints/auth';
import { useAuthFlowStore } from '@/features/auth/store';
import {
  ACCOUNT_TYPE_OPTIONS,
  ACTIVITY_TYPE_OPTIONS,
  CATEGORY_OPTIONS,
  DOCUMENT_ACCEPT,
  GUILD_TYPE_OPTIONS,
  INDUSTRY_TYPE_OPTIONS,
} from '@/features/auth/constants';
import { RoleSchema, type RoleValues } from '@/features/auth/validation/schema';
import { pickErrorCode, authErrorMessage } from '@/features/auth/utils';

interface RoleFormProps {
  onSuccess: (session: AuthSession) => void;
  onBack: () => void;
}

export function RoleForm({ onSuccess, onBack }: RoleFormProps) {
  const draft = useAuthFlowStore((state) => state.draft);
  const patchDraft = useAuthFlowStore((state) => state.patchDraft);
  const setMode = useAuthFlowStore((state) => state.setMode);
  const setStep = useAuthFlowStore((state) => state.setStep);
  const markOtpSent = useAuthFlowStore((state) => state.markOtpSent);
  const signupStep2 = useSignupStep2();
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
      phone: draft.phone,
      channel: draft.channel,
      activityType: values.activityType,
    };

    try {
      const session = await signupStep2.mutateAsync(
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

      onSuccess(session);
    } catch (error) {
      const code = pickErrorCode(error);

      if (code === 'PHONE_ALREADY_REGISTERED' || code === 'SELLER_ALREADY_EXISTS') {
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
      title="اطلاعات کاربری"
      onBack={onBack}
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
            <div className="flex flex-col gap-3">
              <Typography variant="body-sm" className="font-medium text-black">
                نوع حساب
              </Typography>
              <Controller
                name="accountType"
                control={form.control}
                render={({ field }) => (
                  <Tabs
                    items={ACCOUNT_TYPE_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                    variant="outline"
                    fullWidth
                    aria-label="نوع حساب"
                  />
                )}
              />
            </div>

            {isBuyer ? (
              <>
                <FormSelect<RoleValues>
                  name="activityType"
                  label="نوع فعالیت"
                  placeholder="انتخاب کنید"
                  searchable
                  filterable={false}
                  fullWidth
                >
                  {ACTIVITY_TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </FormSelect>
                <FormSelect<RoleValues>
                  name="guildType"
                  label="نوع صنف"
                  placeholder="انتخاب کنید"
                  searchable
                  filterable={false}
                  fullWidth
                >
                  {GUILD_TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </FormSelect>
              </>
            ) : (
              <>
                <div className="flex gap-6">
                  <FormSelect<RoleValues>
                    name="category"
                    label="دسته‌بندی"
                    placeholder="انتخاب کنید"
                    searchable
                    filterable={false}
                    fullWidth
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </FormSelect>
                  <FormSelect<RoleValues>
                    name="industryType"
                    label="نوع صنف"
                    placeholder="انتخاب کنید"
                    searchable
                    filterable={false}
                    fullWidth
                  >
                    {INDUSTRY_TYPE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </FormSelect>
                </div>
                <FormSelect<RoleValues>
                  name="activityType"
                  label="نوع فعالیت"
                  placeholder="انتخاب کنید"
                  searchable
                  filterable={false}
                  fullWidth
                >
                  {ACTIVITY_TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </FormSelect>
              </>
            )}

            <Controller
              name="document"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex w-full flex-col gap-1">
                  <Uploader
                    variant="bar"
                    label="مدارک"
                    placeholder="جهت آپلود عکس پروانه کسب یا کارت ملی کلیک کنید"
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

            {serverError && (
              <Typography variant="caption-md" className="text-warning-red">
                {serverError}
              </Typography>
            )}

            <Button
              type="submit"
              color="primary"
              size="lg"
              fullWidth
              disabled={signupStep2.isPending}
            >
              {signupStep2.isPending ? 'در حال ثبت‌نام...' : 'تایید و ثبت‌نام'}
            </Button>
          </>
        );
      }}
    </Form>
  );
}
