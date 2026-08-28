import { PropsWithChildren } from '@/types/children';
import { LandingHeader } from '@/components/layout/home/header';
import { Footer } from '@/components/layout/home/footer';

export function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <LandingHeader />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
