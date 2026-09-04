import type { StoreHeaderConfig } from '@/components/shared';
import { StoreHeaderDesktop } from './store-header-desktop';
import { StoreHeaderMobile } from './store-header-mobile';

interface StoreHeaderProps {
  config: StoreHeaderConfig;
}

export function StoreHeader({ config }: StoreHeaderProps) {
  return (
    <header className="px-12 py-11">
      <StoreHeaderDesktop config={config} />
      <StoreHeaderMobile config={config} />
    </header>
  );
}
