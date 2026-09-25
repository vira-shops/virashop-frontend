'use client';

import { Button, Typography } from '@/components/ui';
import {
  Logo,
  UserActions,
  CategoriesDropdown,
  LocationBadge,
  UserMenu,
} from '@/components/shared';
import { useAuthSession } from '@/hooks/auth';
import { PATHS } from '@/routes/paths';
import { cn } from '@/utils/ui';
import type { StoreHeaderDesktopProps } from './types';

export function StoreHeaderDesktop({ config }: StoreHeaderDesktopProps) {
  const { logo, navItems, userActions, channel, location } = config;
  const { mounted, user, signOut, isPending } = useAuthSession();

  return (
    <div className="hidden bg-white md:block">
      {/* Row 1: Logo + userActions + login/signup button */}
      <div className="border-b border-gray-100 py-7">
        <div className="container flex w-full items-center justify-between gap-12">
          <Logo src={logo.src} alt={logo.alt} />

          <div className="flex items-center gap-2">
            <UserActions actions={userActions} />
            {mounted && user ? (
              <UserMenu user={user} onSignOut={() => void signOut()} isPending={isPending} />
            ) : (
              <Button href={PATHS.AUTH.LOGIN_FOR(channel)} color="primary" variant="fill" size="md">
                ورود و ثبت نام
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Navigation bar */}
      <nav className="border-b border-gray-100 py-4 shadow-md">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-11">
            <CategoriesDropdown channel={channel} />

            {navItems.map(({ label, href }) => (
              <Typography
                key={href}
                variant="caption-lg"
                href={href}
                className={cn('hover:text-primary-500 text-gray-600 transition-colors')}
              >
                {label}
              </Typography>
            ))}
          </div>

          <LocationBadge city={location?.city ?? ''} />
        </div>
      </nav>
    </div>
  );
}
