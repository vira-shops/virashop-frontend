'use client';

import * as React from 'react';
import { BurgerMenuIcon, CancelIcon } from '@icons';
import { Button } from '@/components/ui';
import { UserIdentity } from '@/components/shared';
import { DASHBOARD_A11Y } from './constants';
import { DashboardNav } from './dashboard-nav';
import type { DashboardConfig, DashboardUser } from './types';

interface DashboardMobileBarProps {
  config: DashboardConfig;
  user: DashboardUser;
  onLogout?: () => void;
  loggingOut?: boolean;
}

/**
 * Phone / tablet header: a slim brand bar (menu on the start side, avatar on
 * the end side) whose menu opens the same tile nav in a side drawer.
 */
export const DashboardMobileBar: React.FC<DashboardMobileBarProps> = ({
  config,
  user,
  onLogout,
  loggingOut,
}) => {
  const [open, setOpen] = React.useState(false);
  const drawerId = React.useId();
  const close = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  return (
    <>
      <header className="bg-primary rounded-b-8 sticky top-0 z-30 lg:hidden">
        <div className="container flex h-13 items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            aria-label={DASHBOARD_A11Y.openMenu}
            aria-expanded={open}
            aria-controls={drawerId}
            onClick={() => setOpen(true)}
            icon={<BurgerMenuIcon className="size-10 text-white" />}
            className="hover:bg-white/10"
          />
          <UserIdentity name={user.name} avatarSrc={user.avatarSrc} avatarSize="sm" compact />
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-black/40" onClick={close} />
          <div
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-label={DASHBOARD_A11Y.nav}
            className="absolute inset-y-0 right-0 flex w-72 max-w-[85vw] flex-col gap-9 overflow-y-auto bg-blue-50 p-7 shadow-xl"
          >
            <div className="flex items-center justify-between gap-5">
              <UserIdentity
                name={user.name}
                subtitle={config.subtitle}
                avatarSrc={user.avatarSrc}
                avatarSize="md"
                nameClassName="text-blue-900"
                subtitleClassName="text-blue-300"
              />
              <Button
                variant="ghost"
                size="sm"
                aria-label={DASHBOARD_A11Y.closeMenu}
                onClick={close}
                icon={<CancelIcon className="size-9 text-blue-900" />}
              />
            </div>
            <DashboardNav
              config={config}
              onLogout={onLogout}
              loggingOut={loggingOut}
              onNavigate={close}
            />
          </div>
        </div>
      )}
    </>
  );
};

DashboardMobileBar.displayName = 'DashboardMobileBar';
