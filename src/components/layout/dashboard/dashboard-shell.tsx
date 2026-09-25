'use client';

import * as React from 'react';
import { DashboardHeader } from './dashboard-header';
import { DashboardMobileBar } from './dashboard-mobile-bar';
import { DashboardNav } from './dashboard-nav';
import type { DashboardShellProps } from './types';

export const DashboardShell: React.FC<DashboardShellProps> = ({
  config,
  user,
  onLogout,
  loggingOut,
  children,
}) => (
  <div data-theme={config.theme} className="flex min-h-svh flex-col bg-blue-50">
    <DashboardHeader user={user} subtitle={config.subtitle} />
    <DashboardMobileBar config={config} user={user} onLogout={onLogout} loggingOut={loggingOut} />

    <div className="container flex flex-1 gap-11 py-7 lg:py-11">
      <aside className="hidden w-60 shrink-0 lg:block">
        <DashboardNav
          config={config}
          onLogout={onLogout}
          loggingOut={loggingOut}
          className="sticky top-11"
        />
      </aside>
      <main className="flex min-w-0 flex-1 flex-col gap-9">{children}</main>
    </div>
  </div>
);

DashboardShell.displayName = 'DashboardShell';
