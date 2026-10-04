'use client';

import * as React from 'react';
import { BurgerMenuIcon, CancelIcon } from '@icons';
import { Button, Typography } from '@/components/ui';
import { UserIdentity } from '@/components/shared';
import { cn } from '@/utils/ui';
import { DASHBOARD_A11Y } from './constants';
import { DashboardNav } from './dashboard-nav';
import type { DashboardMobileBarProps } from './types';

const BAR_CLASS = 'bg-primary rounded-b-8 sticky top-0 z-30';

/**
 * Phone / tablet header: a slim brand bar (menu on the start side, avatar on
 * the end side). The menu opens a full-screen «منو» page with the same tile
 * nav, topped by a bar carrying the user and a close button — per the design.
 */
export const DashboardMobileBar: React.FC<DashboardMobileBarProps> = ({
  config,
  user,
  onLogout,
  loggingOut,
}) => {
  const [open, setOpen] = React.useState(false);
  const menuId = React.useId();
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
      <header className={cn(BAR_CLASS, 'lg:hidden')}>
        <div className="container flex h-13 items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            aria-label={DASHBOARD_A11Y.openMenu}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen(true)}
            icon={<BurgerMenuIcon className="size-10 text-white" />}
            className="hover:bg-white/10"
          />
          <UserIdentity name={user.name} avatarSrc={user.avatarSrc} avatarSize="sm" compact />
        </div>
      </header>

      {open && (
        <div
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label={DASHBOARD_A11Y.menuTitle}
          className={cn('fixed inset-0 z-40 overflow-y-auto lg:hidden', config.surfaceClassName)}
        >
          <div className={BAR_CLASS}>
            <div className="container flex h-13 items-center justify-between">
              <UserIdentity
                name={user.name}
                avatarSrc={user.avatarSrc}
                avatarSize="sm"
                className="gap-3"
                nameClassName="text-body-md"
              />
              <Button
                variant="ghost"
                size="sm"
                aria-label={DASHBOARD_A11Y.closeMenu}
                onClick={close}
                icon={<CancelIcon className="size-9 text-white" />}
                className="hover:bg-white/10"
              />
            </div>
          </div>

          <div className="container flex flex-col gap-9 py-9">
            <Typography variant="h4" as="h2" className="text-black">
              {DASHBOARD_A11Y.menuTitle}
            </Typography>
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
