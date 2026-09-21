'use client';

import { PropsWithChildren } from '@/types/children';
import { StoreHeader } from '@/components/layout/store/store-header';
import { StoreFooter } from '@/components/layout/store/store-footer';
import { retailChannel } from '@/config/storefront';

export function RetailLayout({ children }: PropsWithChildren) {
  return (
    <div data-theme="retail">
      <StoreHeader config={retailChannel.header} />
      <main className="min-h-svh">{children}</main>
      <StoreFooter config={retailChannel.footer} />
    </div>
  );
}
