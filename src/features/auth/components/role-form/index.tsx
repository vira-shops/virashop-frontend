'use client';

import * as React from 'react';
import { Button, Typography } from '@/components/ui';
import { Form } from '@/components/shared';
import { RoleSchema, type RoleValues } from '@/features/auth/validation/schema';
import { ROLE_FORM_COPY as COPY } from './constants';
import { AccountTypeField, BuyerFields, DocumentField, SellerFields } from './role-fields';
import type { RoleFormProps } from './types';
import { useRoleSubmit } from './use-role-submit';

export function RoleForm({ onSuccess, onBack }: RoleFormProps) {
  const { submit, defaultValues, serverError, submitting } = useRoleSubmit(onSuccess);

  return (
    <Form<RoleValues>
      schema={RoleSchema}
      title={COPY.title}
      onBack={onBack}
      defaultValues={defaultValues}
      onSubmit={submit}
    >
      {(form) => (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-9">
            <AccountTypeField form={form} />

            <div className="flex flex-col gap-10">
              {form.watch('accountType') === 'BUYER' ? <BuyerFields /> : <SellerFields />}
              <DocumentField form={form} />
            </div>
          </div>

          {serverError && (
            <Typography variant="caption-md" className="text-warning-red">
              {serverError}
            </Typography>
          )}

          <Button type="submit" color="primary" size="xl" fullWidth disabled={submitting}>
            {submitting ? COPY.submitting : COPY.submit}
          </Button>
        </div>
      )}
    </Form>
  );
}
