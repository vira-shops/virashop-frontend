'use client';

import * as React from 'react';
import { Form, PageHeading } from '@/components/shared';
import { PAGE_TITLES, getBuyerChannel } from '@/features/buyer-dashboard/constants';
import {
  PROFILE_FORM_SCHEMAS,
  toProfileFormValues,
  type ProfileFormValues,
} from '@/features/buyer-dashboard/validation/profile-schema';
import { AddressInfoCard } from './address-info-card';
import { BusinessCard } from './business-card';
import { PROFILE_GRID_CLASS } from './constants';
import { PersonalCard } from './personal-card';
import { ProfileEditButton, ProfileFormActions } from './profile-actions';
import { ProfileSkeleton } from './profile-skeleton';
import { ProfileSectionTabs } from './section-tabs';
import type { ProfileFormProps } from './types';
import { useProfileForm } from './use-profile-form';

/**
 * Profile view / edit. Both cards are one form; «ویرایش» unlocks the fields
 * and reveals save / cancel. On phones tabs switch between the two cards.
 * Wholesale shows the business card (phone tabs switch cards); retail shows
 * «اطلاعات تکمیلی» and one long card on phones.
 */
export const ProfileForm: React.FC<ProfileFormProps> = ({ channel }) => {
  const { profileVariant: variant, theme } = getBuyerChannel(channel);
  const { profile, saving, editing, startEditing, stopEditing, section, setSection, submit } =
    useProfileForm(variant);

  return (
    <>
      <PageHeading
        title={PAGE_TITLES.profile}
        actions={!editing && profile.data ? <ProfileEditButton onClick={startEditing} /> : null}
      />

      {/* Retail phones show one long card instead of tabs (per the design). */}
      {variant === 'business' && <ProfileSectionTabs value={section} onChange={setSection} />}

      {profile.isLoading && <ProfileSkeleton />}

      {profile.data && (
        <Form<ProfileFormValues>
          // Re-mount with fresh defaults whenever the saved profile changes.
          key={JSON.stringify(profile.data)}
          schema={PROFILE_FORM_SCHEMAS[variant]}
          defaultValues={toProfileFormValues(profile.data, variant)}
          onSubmit={submit}
          className="gap-7"
        >
          {(form) => (
            <>
              <div className={PROFILE_GRID_CLASS}>
                <PersonalCard
                  form={form}
                  editing={editing}
                  variant={variant}
                  hiddenOnMobile={variant === 'business' && section !== 'personal'}
                  avatarSrc={profile.data!.personal.avatarUrl}
                />
                {variant === 'business' ? (
                  <BusinessCard
                    form={form}
                    editing={editing}
                    hiddenOnMobile={section !== 'secondary'}
                  />
                ) : (
                  <AddressInfoCard form={form} editing={editing} theme={theme} />
                )}
              </div>

              {editing && (
                <ProfileFormActions
                  saving={saving}
                  onCancel={() => {
                    form.reset();
                    stopEditing();
                  }}
                />
              )}
            </>
          )}
        </Form>
      )}
    </>
  );
};
