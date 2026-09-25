import * as React from 'react';
import { UserIdentity } from '@/components/shared';
import type { DashboardUser } from './types';

interface DashboardHeaderProps {
  user: DashboardUser;
  subtitle: string;
}

/** Desktop header band — brand-colored, rounded at the bottom, account block at the start. */
export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, subtitle }) => (
  <header className="bg-primary rounded-b-8 hidden lg:block">
    <div className="container flex h-24 items-center">
      <UserIdentity name={user.name} subtitle={subtitle} avatarSrc={user.avatarSrc} />
    </div>
  </header>
);

DashboardHeader.displayName = 'DashboardHeader';
