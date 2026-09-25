'use client';

import * as React from 'react';
import { Button, Typography } from '@/components/ui';
import { Form, FormInput, FormSelect } from '@/components/shared';
import { useUpdateSellerBooth } from '@/hooks';
import { PROVINCE_OPTIONS, SALES_TYPE_OPTIONS } from '@/features/auth/constants';
import { BoothSchema, type BoothValues } from '@/features/auth/validation/schema';
import { authErrorMessage } from '@/features/auth/utils';
import { BOOTH_DEFAULT_VALUES, BOOTH_FIELDS as F, BOOTH_FORM_COPY as COPY } from './constants';
import type { BoothFormProps } from './types';

export function BoothForm({ onSuccess }: BoothFormProps) {
  const updateBooth = useUpdateSellerBooth();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleSubmit = async (values: BoothValues) => {
    setServerError(null);

    try {
      const booth = await updateBooth.mutateAsync({
        shopName: values.shopName,
        workplacePhone: values.workplacePhone || undefined,
        province: values.province,
        city: values.city,
        postalCode: values.postalCode || undefined,
        salesType: values.salesType,
        address: values.address,
      });

      onSuccess(booth);
    } catch (error) {
      setServerError(authErrorMessage(error));
    }
  };

  return (
    <Form<BoothValues>
      schema={BoothSchema}
      defaultValues={BOOTH_DEFAULT_VALUES}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" className="text-center text-black">
        {COPY.title}
      </Typography>
      <Typography variant="body-sm" className="text-center text-gray-400">
        {COPY.description}
      </Typography>

      <FormInput<BoothValues> name="shopName" {...F.shopName} fullWidth />

      <FormSelect<BoothValues> name="province" {...F.province} searchable fullWidth>
        {PROVINCE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FormSelect>

      <FormInput<BoothValues> name="city" {...F.city} fullWidth />

      <FormSelect<BoothValues>
        name="salesType"
        {...F.salesType}
        searchable
        filterable={false}
        fullWidth
      >
        {SALES_TYPE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FormSelect>

      <FormInput<BoothValues>
        name="postalCode"
        {...F.postalCode}
        dir="ltr"
        inputMode="numeric"
        fullWidth
      />
      <FormInput<BoothValues>
        name="workplacePhone"
        {...F.workplacePhone}
        dir="ltr"
        inputMode="tel"
        fullWidth
      />

      <FormInput<BoothValues> name="address" {...F.address} fullWidth />

      {serverError && (
        <Typography variant="caption-md" className="text-warning-red">
          {serverError}
        </Typography>
      )}

      <Button type="submit" color="primary" size="xl" fullWidth disabled={updateBooth.isPending}>
        {updateBooth.isPending ? COPY.submitting : COPY.submit}
      </Button>
    </Form>
  );
}
