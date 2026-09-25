import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { ProfileFormValues } from '@/features/buyer-dashboard/validation/profile-schema';

export type ProfileSection = 'personal' | 'business';

/** What every card / field group needs from the form. */
export interface ProfileFieldGroupProps {
  form: UseFormReturn<ProfileFormValues>;
  /** Fields are read-only until «ویرایش». */
  editing: boolean;
}

export interface ProfileCardProps extends ProfileFieldGroupProps {
  /** The card is not the one selected in the phone tabs. */
  hiddenOnMobile: boolean;
}

export interface PersonalCardProps extends ProfileCardProps {
  avatarSrc: string | null;
}

export interface SectionTitleProps {
  children: ReactNode;
}

export interface DocumentFieldProps {
  disabled: boolean;
}

export interface ProfileEditButtonProps {
  onClick: () => void;
}

export interface ProfileFormActionsProps {
  saving: boolean;
  onCancel: () => void;
}

export interface ProfileSectionTabsProps {
  value: ProfileSection;
  onChange: (section: ProfileSection) => void;
}
