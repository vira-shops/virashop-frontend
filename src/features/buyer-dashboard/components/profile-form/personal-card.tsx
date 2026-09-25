'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Avatar, DateInput } from '@/components/ui';
import { FormInput, FormSelect } from '@/components/shared';
import { cn } from '@/utils/ui';
import type { ProfileFormValues } from '@/features/buyer-dashboard/validation/profile-schema';
import {
  GENDER_OPTIONS,
  PROFILE_CARD_CLASS,
  PROFILE_CARD_HIDDEN_CLASS,
  PROFILE_FIELD_PROPS,
  PROFILE_LABELS as L,
  PROFILE_SECTIONS,
} from './constants';
import { SectionTitle } from './section-title';
import type { PersonalCardProps } from './types';

/** «اطلاعات شخصی» — avatar, name, mobile (read-only), national id, birth date, gender. */
export const PersonalCard: React.FC<PersonalCardProps> = ({
  form,
  editing,
  hiddenOnMobile,
  avatarSrc,
}) => (
  <section
    aria-label={PROFILE_SECTIONS.personal}
    className={cn(PROFILE_CARD_CLASS, hiddenOnMobile && PROFILE_CARD_HIDDEN_CLASS)}
  >
    {/* Desktop shows the card without a title, as the design does. */}
    <div className="lg:hidden">
      <SectionTitle>{PROFILE_SECTIONS.personal}</SectionTitle>
    </div>
    <Avatar src={avatarSrc} alt={L.avatar} size="xl" className="mx-auto max-lg:size-14" />

    <FormInput<ProfileFormValues>
      name="fullName"
      label={L.fullName}
      disabled={!editing}
      {...PROFILE_FIELD_PROPS}
    />
    <FormInput<ProfileFormValues>
      name="mobile"
      label={L.mobile}
      readOnly
      disabled={!editing}
      {...PROFILE_FIELD_PROPS}
    />
    <FormInput<ProfileFormValues>
      name="nationalId"
      label={L.nationalId}
      inputMode="numeric"
      disabled={!editing}
      {...PROFILE_FIELD_PROPS}
    />
    <Controller
      control={form.control}
      name="birthDate"
      render={({ field, fieldState }) => (
        <DateInput
          label={L.birthDate}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          disabled={!editing}
          state={fieldState.error ? 'error' : undefined}
          inputMessage={fieldState.error?.message}
          {...PROFILE_FIELD_PROPS}
        />
      )}
    />
    <FormSelect<ProfileFormValues>
      name="gender"
      label={L.gender}
      placeholder={L.genderPlaceholder}
      searchable
      filterable={false}
      disabled={!editing}
      {...PROFILE_FIELD_PROPS}
    >
      {GENDER_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FormSelect>
  </section>
);
