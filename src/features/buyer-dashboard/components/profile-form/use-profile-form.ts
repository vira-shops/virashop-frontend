'use client';

import * as React from 'react';
import { useToast } from '@/components/feedback';
import { useProfile, useUpdateProfile } from '@/hooks';
import {
  toProfileUpdateRequest,
  type ProfileFormValues,
} from '@/features/buyer-dashboard/validation/profile-schema';
import { PROFILE_LABELS } from './constants';
import type { ProfileSection } from './types';

/** Profile data + the page's view / edit / save state. */
export const useProfileForm = () => {
  const profile = useProfile();
  const update = useUpdateProfile();
  const toast = useToast();
  const [editing, setEditing] = React.useState(false);
  const [section, setSection] = React.useState<ProfileSection>('personal');

  const submit = async (values: ProfileFormValues) => {
    try {
      await update.mutateAsync(toProfileUpdateRequest(values));
      toast.success(PROFILE_LABELS.saved);
      setEditing(false);
    } catch {
      toast.error(PROFILE_LABELS.saveFailed);
    }
  };

  return {
    profile,
    saving: update.isPending,
    editing,
    startEditing: () => setEditing(true),
    stopEditing: () => setEditing(false),
    section,
    setSection,
    submit,
  };
};
