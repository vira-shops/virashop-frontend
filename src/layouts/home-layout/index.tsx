import { PropsWithChildren } from '@/types/children';
import { LandingHeader } from '@/components/layout/home/header';
import { Footer } from '@/components/layout/home/footer';

export function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <LandingHeader />
      <main className="flex min-h-screen flex-col gap-14">{children}</main>
      <Footer />
    </>
  );
}
