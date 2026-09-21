'use client';

import { Button } from '@/components/ui';
import { Logo } from '@/components/shared';
import { UserIcon } from '@icons';
import { useAuthSession } from '@/hooks/auth';
import { PATHS } from '@/routes/paths';
import { StoreMobileSidebar } from './store-mobile-sidebar';
import type { StoreHeaderMobileProps } from './types';

export function StoreHeaderMobile({ config }: StoreHeaderMobileProps) {
  const { logo, mobileNavItems, channel, location } = config;
  const { mounted, user, signOut } = useAuthSession();

  return (
    <div className="bg-white md:hidden">
      <div className="border-b border-gray-100 py-4">
        <div className="container flex items-center justify-between">
          {/* Right in RTL: burger menu */}
          <StoreMobileSidebar logo={logo} city={location?.city} navItems={mobileNavItems} />

          {/* Center: logo */}
          <Logo src={logo.src} alt={logo.alt} />

          {/* Left in RTL: user icon (login) / logout when signed in */}
          {mounted && user ? (
            <Button variant="outline" color="primary" size="sm" onClick={() => void signOut()}>
              خروج
            </Button>
          ) : (
            <Button
              href={PATHS.AUTH.LOGIN_FOR(channel)}
              color="primary"
              variant="fill"
              size="xl"
              aria-label="ورود و ثبت نام"
              icon={<UserIcon className="size-10" />}
            />
          )}
        </div>
      </div>
    </div>
  );
}
