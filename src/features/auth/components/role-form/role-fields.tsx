'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Tabs, Typography, Uploader } from '@/components/ui';
import {
  ACCOUNT_TYPE_OPTIONS,
  ACTIVITY_TYPE_OPTIONS,
  CATEGORY_OPTIONS,
  DOCUMENT_ACCEPT,
  GUILD_TYPE_OPTIONS,
  INDUSTRY_TYPE_OPTIONS,
} from '@/features/auth/constants';
import { ROLE_FORM_COPY as COPY } from './constants';
import { RoleSelectField } from './role-select-field';
import type { RoleFieldGroupProps } from './types';

/** «نوع حساب» — buyer / seller / both. */
export const AccountTypeField: React.FC<RoleFieldGroupProps> = ({ form }) => (
  <div className="flex flex-col gap-4">
    <Typography variant="body-sm" className="font-medium text-black">
      {COPY.accountType}
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
          aria-label={COPY.accountType}
          className="h-13 gap-4 p-2"
        />
      )}
    />
  </div>
);

export const BuyerFields: React.FC = () => (
  <>
    <RoleSelectField
      name="activityType"
      label={COPY.activityType}
      options={ACTIVITY_TYPE_OPTIONS}
    />
    <RoleSelectField name="guildType" label={COPY.guildType} options={GUILD_TYPE_OPTIONS} />
  </>
);

export const SellerFields: React.FC = () => (
  <>
    <div className="flex gap-7">
      <RoleSelectField name="category" label={COPY.category} options={CATEGORY_OPTIONS} />
      <RoleSelectField
        name="industryType"
        label={COPY.industryType}
        options={INDUSTRY_TYPE_OPTIONS}
      />
    </div>
    <RoleSelectField
      name="activityType"
      label={COPY.activityType}
      options={ACTIVITY_TYPE_OPTIONS}
    />
  </>
);

/** «مدارک» — the national card / business license upload. */
export const DocumentField: React.FC<RoleFieldGroupProps> = ({ form }) => (
  <Controller
    name="document"
    control={form.control}
    render={({ field, fieldState }) => (
      <div className="flex w-full flex-col gap-1">
        <Uploader
          variant="bar"
          label={COPY.documentLabel}
          placeholder={COPY.documentPlaceholder}
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
);
