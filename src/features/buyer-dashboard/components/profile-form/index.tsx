'use client';

import * as React from 'react';
import { Form, PageHeading } from '@/components/shared';
import { PAGE_TITLES } from '@/features/buyer-dashboard/constants';
import {
  ProfileFormSchema,
  toProfileFormValues,
  type ProfileFormValues,
} from '@/features/buyer-dashboard/validation/profile-schema';
import { BusinessCard } from './business-card';
import { PROFILE_GRID_CLASS } from './constants';
import { PersonalCard } from './personal-card';
import { ProfileEditButton, ProfileFormActions } from './profile-actions';
import { ProfileSkeleton } from './profile-skeleton';
import { ProfileSectionTabs } from './section-tabs';
import { useProfileForm } from './use-profile-form';

/**
 * Profile view / edit. Both cards are one form; «ویرایش» unlocks the fields
 * and reveals save / cancel. On phones tabs switch between the two cards.
 */
export const ProfileForm: React.FC = () => {
  const { profile, saving, editing, startEditing, stopEditing, section, setSection, submit } =
    useProfileForm();

  return (
    <>
      <PageHeading
        title={PAGE_TITLES.profile}
        actions={!editing && profile.data ? <ProfileEditButton onClick={startEditing} /> : null}
      />

      <ProfileSectionTabs value={section} onChange={setSection} />

      {profile.isLoading && <ProfileSkeleton />}

      {profile.data && (
        <Form<ProfileFormValues>
          // Re-mount with fresh defaults whenever the saved profile changes.
          key={JSON.stringify(profile.data)}
          schema={ProfileFormSchema}
          defaultValues={toProfileFormValues(profile.data)}
          onSubmit={submit}
          className="gap-7"
        >
          {(form) => (
            <>
              <div className={PROFILE_GRID_CLASS}>
                <PersonalCard
                  form={form}
                  editing={editing}
                  hiddenOnMobile={section !== 'personal'}
                  avatarSrc={profile.data!.personal.avatarUrl}
                />
                <BusinessCard
                  form={form}
                  editing={editing}
                  hiddenOnMobile={section !== 'business'}
                />
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
