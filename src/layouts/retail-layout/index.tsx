import { PropsWithChildren } from '@/types/children';
import { StoreHeader, retailConfig } from '@/components/layout/store/store-header';
import { StoreFooter, retailStoreFooterConfig } from '@/components/layout/store/store-footer';

export function RetailLayout({ children }: PropsWithChildren) {
  return (
    <div data-theme="retail">
      <StoreHeader config={retailConfig} />
      <main className="min-h-svh">{children}</main>
      <StoreFooter config={retailStoreFooterConfig} />
    </div>
  );
}
