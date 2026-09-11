'use client';

import { Button, Typography } from '@/components/ui';
import { Logo, UserActions, CategoriesDropdown, LocationBadge } from '@/components/shared';
import { buildAuthHref, useAuthSession } from '@/features/auth';
import { cn } from '@/utils/ui';
import { DESKTOP_NAV_ITEMS, MOCK_USER_CITY } from './__fixtures__';
import type { StoreHeaderDesktopProps } from './types';

export function StoreHeaderDesktop({ config }: StoreHeaderDesktopProps) {
  const { logo, userActions, channel } = config;
  const { mounted, user, signOut } = useAuthSession();

  return (
    <div className="hidden bg-white md:block">
      {/* Row 1: Logo + userActions + login/signup button */}
      <div className="border-b border-gray-100 py-4">
        <div className="container flex w-full items-center justify-between gap-12">
          <Logo src={logo.src} alt={logo.alt} />

          <div className="flex items-center gap-2">
            <UserActions actions={userActions} />
            {mounted && user ? (
              <div className="flex items-center gap-2">
                <Typography variant="caption-lg" className="text-gray-600">
                  {user.fullName}
                </Typography>
                <Button variant="outline" color="primary" size="sm" onClick={() => void signOut()}>
                  خروج
                </Button>
              </div>
            ) : (
              <Button href={buildAuthHref(channel)} color="primary" variant="fill" size="md">
                ورود و ثبت نام
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Navigation bar */}
      <nav className="border-b border-gray-100 py-8 shadow-md">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-11">
            <CategoriesDropdown />

            {DESKTOP_NAV_ITEMS.map(({ label, href }) => (
              <Typography
                key={href}
                variant="caption-lg"
                href={href}
                className={cn('text-gray-600 transition-colors hover:text-gray-700')}
              >
                {label}
              </Typography>
            ))}
          </div>

          <LocationBadge city={MOCK_USER_CITY} />
        </div>
      </nav>
    </div>
  );
}
