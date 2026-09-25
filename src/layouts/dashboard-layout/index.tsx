'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from '@/types/children';
import {
  DASHBOARD_FALLBACK_USER_NAME,
  buyerDashboardConfig,
  DashboardShell,
  type DashboardConfig,
} from '@/components/layout/dashboard';
import { useAuthSession } from '@/hooks';
import { PATHS } from '@/routes/paths';

interface DashboardLayoutProps extends PropsWithChildren {
  config: DashboardConfig;
}

export function DashboardLayout({ config, children }: DashboardLayoutProps) {
  const router = useRouter();
  const { mounted, user, signOut, isPending } = useAuthSession();

  const handleLogout = React.useCallback(async () => {
    await signOut();
    router.replace(PATHS.ROOT);
  }, [signOut, router]);

  const name = (mounted && user?.fullName) || DASHBOARD_FALLBACK_USER_NAME;

  return (
    <DashboardShell config={config} user={{ name }} onLogout={handleLogout} loggingOut={isPending}>
      {children}
    </DashboardShell>
  );
}

/**
 * Buyer dashboard frame. The config carries icon components, which cannot
 * cross the server → client boundary as props — so a client module binds
 * it and the route's server `layout.tsx` renders this instead.
 */
export function BuyerDashboardLayout({ children }: PropsWithChildren) {
  return <DashboardLayout config={buyerDashboardConfig}>{children}</DashboardLayout>;
}
