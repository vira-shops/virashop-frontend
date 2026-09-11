'use client';

import { Button } from '@/components/ui';
import { Logo } from '@/components/shared';
import { UserIcon } from '@icons';
import { buildAuthHref, useAuthSession } from '@/features/auth';
import { RetailMobileSidebar } from './retail-mobile-sidebar';
import type { StoreHeaderMobileProps } from './types';

export function StoreHeaderMobile({ config }: StoreHeaderMobileProps) {
  const { logo, channel, location } = config;
  const { mounted, user, signOut } = useAuthSession();

  return (
    <div className="bg-white md:hidden">
      <div className="border-b border-gray-100 py-4">
        <div className="container flex items-center justify-between">
          {/* Right in RTL: burger menu */}
          <RetailMobileSidebar logo={logo} city={location?.city} />

          {/* Center: logo */}
          <Logo src={logo.src} alt={logo.alt} />

          {/* Left in RTL: user icon (login) / logout when signed in */}
          {mounted && user ? (
            <Button variant="outline" color="primary" size="sm" onClick={() => void signOut()}>
              خروج
            </Button>
          ) : (
            <Button
              href={buildAuthHref(channel)}
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
