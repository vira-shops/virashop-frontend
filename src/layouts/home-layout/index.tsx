import { PropsWithChildren } from '@/types/children';
import { LandingHeader } from '@/components/layout/home/header';
import { Footer } from '@/components/layout/home/footer';
import { LandingBottomBar, LANDING_BOTTOM_BAR_ITEMS } from '@/components/layout/home/bottom-bar';

export function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
      <LandingHeader />
      <main className="flex min-h-screen flex-col gap-14">{children}</main>

      {/* Reserves exactly the fixed bar's 64px on phones so the footer's last
          row is never trapped underneath it. */}
      <div className="max-md:pb-14">
        <Footer />
      </div>

      <LandingBottomBar items={LANDING_BOTTOM_BAR_ITEMS} />
    </>
  );
}
