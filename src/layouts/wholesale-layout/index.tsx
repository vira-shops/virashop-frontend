'use client';

import { PropsWithChildren } from '@/types/children';
import { StoreHeader } from '@/components/layout/store/store-header';
import { StoreFooter } from '@/components/layout/store/store-footer';
import { wholesaleChannel } from '@/config/storefront';
import { cn } from '@/utils/ui';

export function WholesaleLayout({ children }: PropsWithChildren) {
  return (
    <div data-theme="wholesale">
      <StoreHeader config={wholesaleChannel.header} />
      <main
        className={cn('flex min-h-svh flex-col gap-13 md:gap-16', wholesaleChannel.mainClassName)}
      >
        {children}
      </main>
      <StoreFooter config={wholesaleChannel.footer} />
    </div>
  );
}
