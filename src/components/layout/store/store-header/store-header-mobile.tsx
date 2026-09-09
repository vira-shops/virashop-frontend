import { Button } from '@/components/ui';
import { Logo } from '@/components/shared';
import { UserIcon } from '@icons';
import { PATHS } from '@/routes/paths';
import { RetailMobileSidebar } from './retail-mobile-sidebar';
import type { StoreHeaderMobileProps } from './types';

export function StoreHeaderMobile({ config }: StoreHeaderMobileProps) {
  const { logo } = config;

  return (
    <div className="md:hidden">
      <div className="border-b border-gray-100 py-4">
        <div className="container flex items-center justify-between">
          {/* Right in RTL: burger menu */}
          <RetailMobileSidebar logo={logo} />

          {/* Center: logo */}
          <Logo src={logo.src} alt={logo.alt} />

          {/* Left in RTL: user icon (login) */}
          <Button
            href={PATHS.AUTH.LOGIN}
            color="primary"
            variant="fill"
            size="xl"
            aria-label="ورود و ثبت نام"
            icon={<UserIcon className="size-10" />}
          />
        </div>
      </div>
    </div>
  );
}
