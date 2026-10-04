'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui';
import { Form, FormInput, FormSelect } from '@/components/shared';
import { useCities, useProvinces } from '@/hooks';
import { AddressField } from '@/features/buyer-dashboard/components/address-field';
import {
  AddressFormSchema,
  type AddressFormValues,
} from '@/features/buyer-dashboard/validation/address-schema';
import {
  ADDRESS_COPY as C,
  ADDRESS_FIELD_PROPS,
  ADDRESS_LABEL_CLASS,
  addressFormTitle,
} from './constants';
import type { AddressFormProps } from './types';

/**
 * Add / edit form, inline in the addresses card: استان · شهر · کد پستی,
 * پلاک · واحد, then «آدرس N» with the map tile, and «ثبت».
 */
export const AddressForm: React.FC<AddressFormProps> = ({
  index,
  defaultValues,
  saving,
  onSubmit,
  onCancel,
  theme,
}) => {
  const provinces = useProvinces();
  const cities = useCities();
  const title = addressFormTitle(index);

  return (
    <section aria-label={title} className="border-t border-blue-100 py-7 first:border-t-0">
      <Form<AddressFormValues>
        schema={AddressFormSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        className="gap-9"
      >
        {(form) => (
          <>
            <div className="grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-4">
              <FormSelect<AddressFormValues>
                name="province"
                label={C.province}
                requiredMark
                placeholder={C.choose}
                searchable
                {...ADDRESS_FIELD_PROPS}
              >
                {(provinces.data ?? []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormSelect>
              <FormSelect<AddressFormValues>
                name="city"
                label={C.city}
                requiredMark
                placeholder={C.choose}
                searchable
                {...ADDRESS_FIELD_PROPS}
              >
                {(cities.data ?? []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormSelect>
              <div className="col-span-2">
                <FormInput<AddressFormValues>
                  name="postalCode"
                  label={C.postalCode}
                  requiredMark
                  inputMode="numeric"
                  {...ADDRESS_FIELD_PROPS}
                />
              </div>
              <div className="md:col-span-2">
                <FormInput<AddressFormValues>
                  name="plaque"
                  label={C.plaque}
                  {...ADDRESS_FIELD_PROPS}
                />
              </div>
              <div className="md:col-span-2">
                <FormInput<AddressFormValues> name="unit" label={C.unit} {...ADDRESS_FIELD_PROPS} />
              </div>
            </div>

            <Controller
              control={form.control}
              name="location"
              render={({ field }) => (
                <AddressField
                  label={title}
                  labelClassName={ADDRESS_LABEL_CLASS}
                  textareaProps={form.register('line')}
                  location={field.value}
                  onLocationChange={(point) => field.onChange(point)}
                  error={form.formState.errors.line?.message}
                  hint={C.lineHint}
                  theme={theme}
                  tileClassName="md:w-56"
                />
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={saving}>
                {C.cancel}
              </Button>
              <Button type="submit" size="sm" disabled={saving}>
                {C.save}
              </Button>
            </div>
          </>
        )}
      </Form>
    </section>
  );
};
