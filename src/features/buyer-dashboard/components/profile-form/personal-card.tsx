'use client';

import * as React from 'react';
import { Avatar } from '@/components/ui';
import { FormInput } from '@/components/shared';
import { cn } from '@/utils/ui';
import type { ProfileFormValues } from '@/features/buyer-dashboard/validation/profile-schema';
import {
  PROFILE_CARD_CLASS,
  PROFILE_CARD_HIDDEN_CLASS,
  PROFILE_FIELD_PROPS,
  PROFILE_LABELS as L,
  PROFILE_SECTIONS,
  RETAIL_PERSONAL_CARD_CLASS,
} from './constants';
import { BirthDateField, GenderField } from './demographic-fields';
import { SectionTitle } from './section-title';
import type { PersonalCardProps } from './types';

/**
 * «اطلاعات شخصی» — avatar, name, mobile (read-only), national id. Wholesale
 * adds birth date and gender here; retail moves them to «اطلاعات تکمیلی» and
 * marks its fields required.
 */
export const PersonalCard: React.FC<PersonalCardProps> = ({
  form,
  editing,
  hiddenOnMobile,
  avatarSrc,
  variant,
}) => {
  const retail = variant === 'address';

  return (
    <section
      aria-label={PROFILE_SECTIONS.personal}
      className={cn(
        PROFILE_CARD_CLASS,
        retail && RETAIL_PERSONAL_CARD_CLASS,
        hiddenOnMobile && PROFILE_CARD_HIDDEN_CLASS,
      )}
    >
      {/* Desktop shows the card without a title, as the design does; retail never titles it. */}
      {!retail && (
        <div className="lg:hidden">
          <SectionTitle>{PROFILE_SECTIONS.personal}</SectionTitle>
        </div>
      )}
      <Avatar
        src={avatarSrc}
        alt={L.avatar}
        size="xl"
        className={cn('mx-auto', !retail && 'max-lg:size-14')}
      />

      <FormInput<ProfileFormValues>
        name="fullName"
        label={L.fullName}
        requiredMark={retail}
        disabled={!editing}
        {...PROFILE_FIELD_PROPS}
      />
      <FormInput<ProfileFormValues>
        name="mobile"
        label={L.mobile}
        requiredMark={retail}
        readOnly
        disabled={!editing}
        {...PROFILE_FIELD_PROPS}
      />
      <FormInput<ProfileFormValues>
        name="nationalId"
        label={L.nationalId}
        requiredMark={retail}
        inputMode="numeric"
        disabled={!editing}
        {...PROFILE_FIELD_PROPS}
      />
      {!retail && (
        <>
          <BirthDateField form={form} editing={editing} />
          <GenderField editing={editing} />
        </>
      )}
    </section>
  );
};
