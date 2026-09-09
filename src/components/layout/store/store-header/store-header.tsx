'use client';

import type { StoreHeaderConfig } from '@/components/shared';
import { StoreHeaderDesktop } from './store-header-desktop';
import { StoreHeaderMobile } from './store-header-mobile';

interface StoreHeaderProps {
  config: StoreHeaderConfig;
}

export function StoreHeader({ config }: StoreHeaderProps) {
  return (
    <header className="sticky top-0 z-50">
      <StoreHeaderDesktop config={config} />
      <StoreHeaderMobile config={config} />
    </header>
  );
}
