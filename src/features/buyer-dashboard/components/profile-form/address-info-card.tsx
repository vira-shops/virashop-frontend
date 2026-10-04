'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import { FormInput } from '@/components/shared';
import { AddressField } from '@/features/buyer-dashboard/components/address-field';
import type { ProfileFormValues } from '@/features/buyer-dashboard/validation/profile-schema';
import { cn } from '@/utils/ui';
import {
  PROFILE_CARD_CLASS,
  PROFILE_FIELD_PROPS,
  PROFILE_LABEL_CLASS,
  PROFILE_LABELS as L,
  PROFILE_SECTIONS,
  RETAIL_EXTRA_CARD_CLASS,
} from './constants';
import { BirthDateField, GenderField } from './demographic-fields';
import { SectionTitle } from './section-title';
import type { AddressInfoCardProps } from './types';

/**
 * «اطلاعات تکمیلی» (retail) — gender, birth date, email, occupation and the
 * home address with its map pin. On phones it continues the personal card.
 */
export const AddressInfoCard: React.FC<AddressInfoCardProps> = ({ form, editing, theme }) => (
  <section
    aria-label={PROFILE_SECTIONS.address}
    className={cn(PROFILE_CARD_CLASS, RETAIL_EXTRA_CARD_CLASS)}
  >
    <SectionTitle>{PROFILE_SECTIONS.address}</SectionTitle>

    <div className="grid grid-cols-1 gap-9 md:grid-cols-2">
      {/* Phones list birth date first; the desktop row puts gender on the start side. */}
      <div className="md:order-2">
        <BirthDateField form={form} editing={editing} requiredMark />
      </div>
      <div className="md:order-1">
        <GenderField editing={editing} />
      </div>
      <div className="md:order-4">
        <FormInput<ProfileFormValues>
          name="occupation"
          label={L.occupation}
          disabled={!editing}
          {...PROFILE_FIELD_PROPS}
        />
      </div>
      <div className="md:order-3">
        <FormInput<ProfileFormValues>
          name="email"
          label={L.email}
          type="email"
          disabled={!editing}
          {...PROFILE_FIELD_PROPS}
        />
      </div>
    </div>

    <Controller
      control={form.control}
      name="location"
      render={({ field }) => (
        <AddressField
          label={L.address}
          requiredMark
          labelClassName={PROFILE_LABEL_CLASS}
          textareaProps={form.register('address')}
          location={field.value}
          onLocationChange={(point) => field.onChange(point)}
          error={form.formState.errors.address?.message}
          disabled={!editing}
          theme={theme}
        />
      )}
    />
  </section>
);
