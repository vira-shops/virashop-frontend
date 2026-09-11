'use client';

import * as React from 'react';
import { Button, Typography } from '@/components/ui';
import { Form, FormInput, FormSelect } from '@/components/shared';
import { useUpdateSellerBooth } from '@/hooks';
import type { SellerBoothResponse } from '@/contracts/endpoints/auth';
import { PROVINCE_OPTIONS, SALES_TYPE_OPTIONS } from '@/features/auth/constants';
import { BoothSchema, type BoothValues } from '@/features/auth/validation/schema';
import { authErrorMessage } from '@/features/auth/utils';

interface BoothFormProps {
  /** Fires after `PATCH /auth/sellers/me` succeeds (booth still PENDING). */
  onSuccess: (booth: SellerBoothResponse) => void;
}

/**
 * Post-OTP booth completion for seller/both signups — filling this form is
 * required before the user enters the site. It only completes the shop
 * profile; the booth itself stays `PENDING` until an admin activates it.
 */
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
      defaultValues={{
        shopName: '',
        workplacePhone: '',
        province: '',
        city: '',
        postalCode: '',
        salesType: 'STORE',
        address: '',
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" className="text-center text-black">
        تکمیل اطلاعات غرفه
      </Typography>
      <Typography variant="body-sm" className="text-center text-gray-400">
        برای ساخت غرفه فروشندگی، اطلاعات فروشگاه خود را وارد کنید
      </Typography>

      <FormInput<BoothValues>
        name="shopName"
        label="نام غرفه"
        placeholder="نام فروشگاه خود را وارد کنید"
        fullWidth
      />

      <FormSelect<BoothValues> name="province" label="استان" placeholder="انتخاب کنید" fullWidth>
        {PROVINCE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FormSelect>

      <FormInput<BoothValues>
        name="city"
        label="شهر"
        placeholder="شهر خود را وارد کنید"
        fullWidth
      />

      <FormSelect<BoothValues> name="salesType" label="نوع فروش" fullWidth>
        {SALES_TYPE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FormSelect>

      <FormInput<BoothValues>
        name="postalCode"
        label="کد پستی (اختیاری)"
        placeholder="۱۰ رقم"
        dir="ltr"
        inputMode="numeric"
        fullWidth
      />
      <FormInput<BoothValues>
        name="workplacePhone"
        label="تلفن محل کار (اختیاری)"
        placeholder="۰۲۱۱۲۳۴۵۶۷۸"
        dir="ltr"
        inputMode="tel"
        fullWidth
      />

      <FormInput<BoothValues>
        name="address"
        label="آدرس"
        placeholder="آدرس کامل فروشگاه"
        fullWidth
      />

      {serverError && (
        <Typography variant="caption-md" className="text-warning-red">
          {serverError}
        </Typography>
      )}

      <Button type="submit" color="primary" size="lg" fullWidth disabled={updateBooth.isPending}>
        {updateBooth.isPending ? 'در حال ثبت...' : 'ثبت و اتمام'}
      </Button>
    </Form>
  );
}
