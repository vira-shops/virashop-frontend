'use client';

import * as React from 'react';
import { Textarea } from '@/components/ui';
import { FormInput } from '@/components/shared';
import { cn } from '@/utils/ui';
import type { ProfileFormValues } from '@/features/buyer-dashboard/validation/profile-schema';
import { BuyTypeField } from './buy-type-field';
import {
  PROFILE_CARD_CLASS,
  PROFILE_CARD_HIDDEN_CLASS,
  PROFILE_FIELD_PROPS,
  PROFILE_LABELS as L,
  PROFILE_SECTIONS,
} from './constants';
import { DocumentField } from './document-field';
import { LocationField } from './location-field';
import { SectionTitle } from './section-title';
import type { ProfileCardProps } from './types';

/** «اطلاعات کسب‌وکار» — two-column field grid on desktop, one column on phones. */
export const BusinessCard: React.FC<ProfileCardProps> = ({ form, editing, hiddenOnMobile }) => {
  const addressError = form.formState.errors.address?.message;

  return (
    <section
      aria-label={PROFILE_SECTIONS.business}
      className={cn(PROFILE_CARD_CLASS, hiddenOnMobile && PROFILE_CARD_HIDDEN_CLASS)}
    >
      <SectionTitle>{PROFILE_SECTIONS.business}</SectionTitle>

      <div className="grid grid-cols-1 gap-9 md:grid-cols-2">
        <FormInput<ProfileFormValues>
          name="businessName"
          label={L.businessName}
          disabled={!editing}
          {...PROFILE_FIELD_PROPS}
        />
        <FormInput<ProfileFormValues>
          name="businessPhone"
          label={L.businessPhone}
          inputMode="tel"
          disabled={!editing}
          {...PROFILE_FIELD_PROPS}
        />
        <LocationField editing={editing} />
        <FormInput<ProfileFormValues>
          name="postalCode"
          label={L.postalCode}
          inputMode="numeric"
          disabled={!editing}
          {...PROFILE_FIELD_PROPS}
        />
        <BuyTypeField form={form} editing={editing} />
        <Textarea
          label={L.address}
          disabled={!editing}
          rows={5}
          state={addressError ? 'error' : undefined}
          inputMessage={addressError}
          {...PROFILE_FIELD_PROPS}
          {...form.register('address')}
        />
        <DocumentField disabled={!editing} />
      </div>
    </section>
  );
};
