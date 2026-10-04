import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { ProfileFormValues } from '@/features/buyer-dashboard/validation/profile-schema';
import type { BuyerChannelProps, BuyerProfileVariant } from '@/features/buyer-dashboard/types';

/** Phone tabs: the personal card, or the variant's second card. */
export type ProfileSection = 'personal' | 'secondary';

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

/** «اطلاعات تکمیلی» — needs the theme for its portaled map modal. */
export interface AddressInfoCardProps extends ProfileFieldGroupProps {
  theme: string;
}

export interface PersonalCardProps extends ProfileCardProps {
  avatarSrc: string | null;
  /** Retail keeps only name / mobile / national id here and marks them required. */
  variant: BuyerProfileVariant;
}

/** Birth date + gender — in the personal card (wholesale) or «اطلاعات تکمیلی» (retail). */
export interface DemographicFieldProps extends ProfileFieldGroupProps {
  requiredMark?: boolean;
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

export type ProfileFormProps = BuyerChannelProps;
