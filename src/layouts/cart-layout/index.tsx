'use client';

import { PropsWithChildren } from '@/types/children';
import { StoreHeader } from '@/components/layout/store/store-header';
import { StoreFooter } from '@/components/layout/store/store-footer';
import { getStorefrontChannelByChannel } from '@/config/storefront';
import type { Channel } from '@/validations/primitives';

interface CartLayoutProps extends PropsWithChildren {
  /**
   * Which storefront the buyer came from. `/cart` is shared by both, so the
   * channel travels in the URL (`?channel=`) and decides the header, the
   * footer and the palette — same precedent as the auth wizard.
   */
  channel: Channel;
}

export function CartLayout({ channel, children }: CartLayoutProps) {
  const config = getStorefrontChannelByChannel(channel);

  return (
    <div data-theme={config.segment}>
      <StoreHeader config={config.header} />
      <main className="min-h-svh bg-gray-50">{children}</main>
      <StoreFooter config={config.footer} />
    </div>
  );
}
