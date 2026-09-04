import { Logo, MobileMenu } from '@/components/shared';
import type { StoreHeaderConfig } from '@/components/shared';

interface StoreHeaderMobileProps {
  config: StoreHeaderConfig;
}

export function StoreHeaderMobile({ config }: StoreHeaderMobileProps) {
  const { logo, brandName, navItems, userActions } = config;

  return (
    <div className="flex items-center justify-center gap-9 md:hidden">
      <MobileMenu
        items={navItems}
        logo={logo}
        brandName={brandName}
        userActions={userActions}
        showSearch
      />
      <Logo src={logo.src} alt={logo.alt} />
    </div>
  );
}
