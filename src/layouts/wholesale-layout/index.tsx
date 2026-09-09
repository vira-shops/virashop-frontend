'use client';

import { PropsWithChildren } from '@/types/children';
import { StoreHeader, wholesaleConfig } from '@/components/layout/store/store-header';
import { StoreFooter, wholesaleStoreFooterConfig } from '@/components/layout/store/store-footer';

export function WholesaleLayout({ children }: PropsWithChildren) {
  return (
    <div data-theme="wholesale">
      <StoreHeader config={wholesaleConfig} />
      <main className="min-h-svh bg-blue-50">{children}</main>
      <StoreFooter config={wholesaleStoreFooterConfig} />
    </div>
  );
}
