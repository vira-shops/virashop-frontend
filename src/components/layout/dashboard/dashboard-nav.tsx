'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Divider } from '@/components/ui';
import { cn } from '@/utils/ui';
import { DASHBOARD_A11Y } from './constants';
import type { DashboardConfig, DashboardNavItem } from './types';
import { isNavItemActive } from './utils';

interface DashboardNavProps {
  config: DashboardConfig;
  onLogout?: () => void;
  loggingOut?: boolean;
  /** Called after any tile is used — the mobile drawer closes itself with it. */
  onNavigate?: () => void;
  className?: string;
}

const TILE =
  'rounded-8 flex aspect-square w-full flex-col items-center justify-center gap-3 p-3 text-center text-caption-lg transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

const TILE_IDLE = 'text-blue-300 hover:bg-white hover:text-primary';

const TILE_ACTIVE = 'bg-primary text-white shadow-lg shadow-primary/30';

const NavTile: React.FC<{
  item: DashboardNavItem;
  active: boolean;
  onLogout?: () => void;
  loggingOut?: boolean;
  onNavigate?: () => void;
}> = ({ item, active, onLogout, loggingOut, onNavigate }) => {
  const Icon = item.icon;
  const content = (
    <>
      <Icon aria-hidden="true" className="size-10 shrink-0" />
      <span>{item.label}</span>
    </>
  );

  if (item.action === 'logout') {
    return (
      <button
        type="button"
        disabled={loggingOut}
        onClick={() => {
          onNavigate?.();
          onLogout?.();
        }}
        className={cn(TILE, TILE_IDLE, 'disabled:cursor-wait disabled:opacity-60')}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={item.href ?? '#'}
      aria-current={active ? 'page' : undefined}
      onClick={onNavigate}
      className={cn(TILE, active ? TILE_ACTIVE : TILE_IDLE)}
    >
      {content}
    </Link>
  );
};

export const DashboardNav: React.FC<DashboardNavProps> = ({
  config,
  onLogout,
  loggingOut,
  onNavigate,
  className,
}) => {
  const pathname = usePathname();

  const renderGroup = (items: DashboardNavItem[]) => (
    <ul className="grid grid-cols-2 gap-5">
      {items.map((item) => (
        <li key={item.key}>
          <NavTile
            item={item}
            active={isNavItemActive(item, pathname)}
            onLogout={onLogout}
            loggingOut={loggingOut}
            onNavigate={onNavigate}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <nav aria-label={DASHBOARD_A11Y.nav} className={cn('flex flex-col gap-7', className)}>
      {config.quickLinks.length > 0 && (
        <>
          {renderGroup(config.quickLinks)}
          <Divider />
        </>
      )}
      {renderGroup(config.navItems)}
    </nav>
  );
};

DashboardNav.displayName = 'DashboardNav';
