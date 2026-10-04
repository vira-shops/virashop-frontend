'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from '@/types/children';
import {
  DASHBOARD_FALLBACK_USER_NAME,
  retailBuyerDashboardConfig,
  wholesaleBuyerDashboardConfig,
  DashboardShell,
  type DashboardConfig,
} from '@/components/layout/dashboard';
import { useAuthSession } from '@/hooks';
import { PATHS } from '@/routes/paths';
import type { Channel } from '@/validations/primitives';

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

const BUYER_DASHBOARD_CONFIGS: Record<Channel, DashboardConfig> = {
  WHOLESALE: wholesaleBuyerDashboardConfig,
  RETAIL: retailBuyerDashboardConfig,
};

interface BuyerDashboardLayoutProps extends PropsWithChildren {
  channel: Channel;
}

/**
 * Buyer dashboard frame for one storefront channel. The config carries icon
 * components, which cannot cross the server → client boundary as props — so
 * the route's server `layout.tsx` passes only the channel string.
 */
export function BuyerDashboardLayout({ channel, children }: BuyerDashboardLayoutProps) {
  return <DashboardLayout config={BUYER_DASHBOARD_CONFIGS[channel]}>{children}</DashboardLayout>;
}
