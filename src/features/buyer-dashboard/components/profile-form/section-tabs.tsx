import * as React from 'react';
import { Tabs } from '@/components/ui';
import { PAGE_TITLES } from '@/features/buyer-dashboard/constants';
import { PROFILE_SECTION_TABS } from './constants';
import type { ProfileSection, ProfileSectionTabsProps } from './types';

/** Phone-only switch between the personal and business cards. */
export const ProfileSectionTabs: React.FC<ProfileSectionTabsProps> = ({ value, onChange }) => (
  <div className="border-b border-blue-100 lg:hidden">
    <Tabs
      aria-label={PAGE_TITLES.profile}
      variant="underline"
      items={[...PROFILE_SECTION_TABS]}
      value={value}
      onChange={(next) => onChange(next as ProfileSection)}
      itemClassName="pb-4"
    />
  </div>
);
